alter table activities
  add column start_time time not null,
  add column end_time time not null,
  drop column time;
