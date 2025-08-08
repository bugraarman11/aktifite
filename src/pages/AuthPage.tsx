import { useState } from "react";
import { User, Mail, Lock, Calendar, MapPin, Heart, ChevronRight, Eye, EyeOff, Check } from "lucide-react";

type SportEmojis = {
  Tenis: string;
  Basketbol: string;
  Futbol: string;
  Voleybol: string;
  Yüzme: string;
  Koşu: string;
  Bisiklet: string;
  Yoga: string;
  "Masa Tenisi": string;
  Badminton: string;
  Golf: string;
  Boks: string;
  Dans: string;
  Kayak: string;
};

const sportEmojis: Readonly<SportEmojis> = {
  Tenis: "🎾",
  Basketbol: "🏀",
  Futbol: "⚽",
  Voleybol: "🏐",
  Yüzme: "🏊",
  Koşu: "🏃",
  Bisiklet: "🚴",
  Yoga: "🧘",
  "Masa Tenisi": "🏓",
  Badminton: "🏸",
  Golf: "⛳",
  Boks: "🥊",
  Dans: "💃",
  Kayak: "⛷️",
};

type Sport = keyof typeof sportEmojis;

type AuthForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  city: string;
  favoriteSports: Sport[];
};

type LoginForm = {
  email: string;
  password: string;
};

type Errors = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  city: string;
  favoriteSports: string;
};

const INITIAL_FORM: AuthForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  city: "",
  favoriteSports: [],
};

const INITIAL_LOGIN: LoginForm = { email: "", password: "" };

const INITIAL_ERRORS: Errors = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  city: "",
  favoriteSports: "",
};

const cities = ["İstanbul (Avrupa)", "İstanbul (Asya)", "Ankara", "İzmir"] as const;
const sports = Object.keys(sportEmojis) as Sport[];

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

type TextField = Exclude<keyof AuthForm, "favoriteSports">;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState<AuthForm>(INITIAL_FORM);
  const [loginData, setLoginData] = useState<LoginForm>(INITIAL_LOGIN);
  const [errors, setErrors] = useState<Errors>(INITIAL_ERRORS);

  const handleInputChange = (field: TextField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSportToggle = (sport: Sport) => {
    const has = formData.favoriteSports.includes(sport);
    setFormData((prev) => ({
      ...prev,
      favoriteSports: has
        ? prev.favoriteSports.filter((s) => s !== sport)
        : [...prev.favoriteSports, sport],
    }));
    if (errors.favoriteSports) {
      setErrors((prev) => ({ ...prev, favoriteSports: "" }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Errors = { ...INITIAL_ERRORS };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Ad Soyad zorunludur";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Ad Soyad en az 3 karakter olmalıdır";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email zorunludur";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Geçerli bir email adresi girin";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Şifre zorunludur";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı zorunludur";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Errors = { ...INITIAL_ERRORS };
    let isValid = true;

    if (!formData.birthDate) {
      newErrors.birthDate = "Doğum tarihi zorunludur";
      isValid = false;
    } else {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      if (age < 13) {
        newErrors.birthDate = "En az 13 yaşında olmalısınız";
        isValid = false;
      } else if (age > 100) {
        newErrors.birthDate = "Geçerli bir doğum tarihi girin";
        isValid = false;
      }
    }

    if (!formData.city) {
      newErrors.city = "Şehir seçimi zorunludur";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleRegister = () => {
    if (formData.favoriteSports.length === 0) {
      setErrors((prev) => ({ ...prev, favoriteSports: "En az bir spor seçmelisiniz" }));
      return;
    }
    // Demo: başarılı kayıt
    alert("Kayıt başarılı! AKTİFİTE'ye hoş geldiniz! 🎉");
    // İstersen aşağıyı açıp fake login yapabilirsin:
    // localStorage.setItem("token", "ok");
    // window.location.href = "/app";
  };

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      alert("Lütfen email ve şifrenizi girin");
      return;
    }
    alert("Giriş başarılı!");
    // localStorage.setItem("token", "ok");
    // window.location.href = "/app";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2">⚽ AKTİFİTE</h1>
          <p className="text-sm sm:text-base text-gray-600">Spor arkadaşını bul, aktif kal!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mx-4 sm:mx-0">
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => {
                setIsLogin(false);
                setCurrentStep(1);
                setErrors(INITIAL_ERRORS);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                !isLogin ? "bg-white text-blue-600 shadow" : "text-gray-600"
              }`}
            >
              Kayıt Ol
            </button>
            <button
              onClick={() => {
                setIsLogin(true);
                setErrors(INITIAL_ERRORS);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isLogin ? "bg-white text-blue-600 shadow" : "text-gray-600"
              }`}
            >
              Giriş Yap
            </button>
          </div>

          {isLogin ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="ornek@email.com"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Beni hatırla</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Şifremi unuttum
                </a>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Giriş Yap
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                        currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-20 h-1 mx-2 transition-colors ${
                          currentStep > step ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {currentStep === 1 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Temel Bilgiler</h3>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Ad Soyad
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Adınız Soyadınız"
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="ornek@email.com"
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Şifre</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="En az 6 karakter"
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Şifre Tekrar
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Şifrenizi tekrar girin"
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full bg-blue-600 text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    Devam Et
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Kişisel Bilgiler</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Doğum Tarihi</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.birthDate ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.city ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Şehir seçin</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Geri
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      Devam Et
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <Heart className="inline w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
                    Favori Sporlarınız
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    İlgilendiğiniz sporları seçin (en az 1)
                  </p>

                  {errors.favoriteSports && (
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs sm:text-sm text-red-600">{errors.favoriteSports}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 max-h-48 sm:max-h-64 overflow-y-auto">
                    {sports.map((sport) => (
                      <button
                        key={sport}
                        type="button"
                        onClick={() => handleSportToggle(sport)}
                        className={`flex items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg border-2 transition-all ${
                          formData.favoriteSports.includes(sport)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-lg sm:text-2xl">{sportEmojis[sport]}</span>
                        <span className="text-xs sm:text-sm font-medium">{sport}</span>
                        {formData.favoriteSports.includes(sport) && (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Geri
                    </button>
                    <button
                      onClick={handleRegister}
                      className="flex-1 bg-green-600 text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Kaydı Tamamla 🎉
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">Google ile devam et</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setCurrentStep(1);
              setErrors(INITIAL_ERRORS);
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isLogin ? "Kayıt Ol" : "Giriş Yap"}
          </button>
        </p>
      </div>
    </div>
  );
};


export default AuthPage;
