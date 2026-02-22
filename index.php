<?php
    ob_start();
    session_start();
    // session_destroy();
    require_once "models/DataBase.php";
    
    // Opción 1: Lista blanca de controladores permitidos (RECOMENDADA)
    $allowed_controllers = ['Landing', 'Login', 'User', 'Product', 'Dashboard', 'Admin', 'Profile'];
    
    // Obtener y validar el controlador
    $requested_controller = isset($_REQUEST['c']) ? $_REQUEST['c'] : "Landing";
    
    // Validar que el controlador esté en la lista blanca
    if (in_array($requested_controller, $allowed_controllers)) {
        $controller = $requested_controller;
        $route_controller = "controllers/" . $controller . ".php";
        
        if (file_exists($route_controller)) {
            $view = $controller;
            
            // Incluir el controlador de manera segura
            require_once $route_controller;
            
            // Instanciar el controlador
            $controller = new $controller();
            
            // Obtener y validar la acción
            $allowed_actions = ['main', 'create', 'edit', 'delete', 'show', 'update']; // Define las acciones permitidas
            $action = isset($_REQUEST['a']) ? $_REQUEST['a'] : 'main';
            
            // Validar que la acción exista en el controlador
            if (in_array($action, $allowed_actions) && method_exists($controller, $action)) {
                
                if ($view === 'Landing' || $view === 'Login') {
                    // Vistas públicas
                    require_once "views/company/header.view.php";
                    call_user_func(array($controller, $action));
                    require_once "views/company/footer.view.php";
                    
                } elseif (!empty($_SESSION['session'])) {
                    // Validar el rol de sesión
                    $allowed_roles = ['admin', 'user', 'guest', 'manager']; // Define los roles permitidos
                    $session = $_SESSION['session'];
                    
                    if (in_array($session, $allowed_roles)) {
                        // Validar que exista el perfil
                        if (isset($_SESSION['profile'])) {
                            require_once "models/User.php";
                            $profile = unserialize($_SESSION['profile']);
                            
                            // Verificar rutas de vistas según rol
                            $header_path = "views/roles/".$session."/header.view.php";
                            $footer_path = "views/roles/".$session."/footer.view.php";
                            
                            if (file_exists($header_path) && file_exists($footer_path)) {
                                require_once $header_path;
                                call_user_func(array($controller, $action));
                                require_once $footer_path;
                            } else {
                                // Vistas no encontradas
                                header("Location: ?c=Landing&a=main");
                                exit();
                            }
                        }
                    } else {
                        // Rol no válido
                        session_destroy();
                        header("Location: ?c=Landing&a=main");
                        exit();
                    }
                } else {
                    // No hay sesión activa
                    header("Location: ?c=Login&a=main");
                    exit();
                }
            } else {
                // Acción no válida
                header("Location: ?c=Landing&a=main");
                exit();
            }
        } else {
            // Controlador no encontrado
            header("Location: ?c=Landing&a=main");
            exit();
        }
    } else {
        // Controlador no permitido - redirigir a Landing
        header("Location: ?c=Landing&a=main");
        exit();
    }
    
    ob_end_flush();
?>