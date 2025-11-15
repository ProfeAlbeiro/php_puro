INSERT INTO `users` (`rol_code`, `user_code`, `user_name`, `user_lastname`, `user_id`, `user_email`, `user_pass`, `user_state`) VALUES
(1, null, 'Prueba', 'Datos', '132456789852', 'inventado@correo.co', '8cb2237d0679ca88db6464eac60da96345513964', 1);

select 
    r.rol_code,
    r.rol_name,
    user_code,
    user_name,
    user_lastname,
    user_id,
    user_email,
    user_pass,
    user_state
  from ROLES as r
  inner join USERS as u
  on r.rol_code=u.rol_code
  WHERE user_code=1