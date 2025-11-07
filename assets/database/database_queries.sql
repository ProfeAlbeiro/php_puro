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