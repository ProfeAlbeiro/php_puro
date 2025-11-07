
-- Datos Roles

INSERT INTO `roles` (`rol_code`, `rol_name`) VALUES
(1, 'admin'),
(2, 'customer'),
(3, 'seller');

-- Datos Usuario

INSERT INTO `users` (`rol_code`, `user_code`, `user_name`, `user_lastname`, `user_id`, `user_email`, `user_pass`, `user_state`) VALUES
(1, 1, 'Albeiro', 'Ramos', '7318924', 'eramos@sena.edu.co', '8cb2237d0679ca88db6464eac60da96345513964', 1),
(3, 2, 'Juan', 'Charrasquiado', '45645456', 'juan@charrasquiao.com', '8cb2237d0679ca88db6464eac60da96345513964', 1),
(3, 3, 'Vicente', 'Fernández', '123123123', 'vicente@fernandez.com', '348162101fc6f7e624681b7400b085eeac6df7bd', 0),
(2, 4, 'Marinita', 'García', '456456456', 'marina@garcia.com', '8cb2237d0679ca88db6464eac60da96345513964', 1),
(2, 5, 'Pedro', 'Infante', '789789798', 'pedro@infante.com', '8cb2237d0679ca88db6464eac60da96345513964', 1),
(2, 6, 'Jorge', 'Negrete', '321321312', 'jorge@negrete.com', '348162101fc6f7e624681b7400b085eeac6df7bd', 0),
(1, 7, 'Myriam', 'Becerra', '123456789', 'myriam@becerra.com', '8cb2237d0679ca88db6464eac60da96345513964', 1),
(2, 8, 'prueba', 'customer', '456456456', 'prueba@customer.com', '8cb2237d0679ca88db6464eac60da96345513964', 1);