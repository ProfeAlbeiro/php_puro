<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<title>SisWebPhP</title>
	<link rel="shortcut icon" href="assets/dashboard/assets/img/logo-sena-verde-png-sin-fondo.png">

	<!-- Normalize V8.0.1 -->
	<link rel="stylesheet" href="assets/dashboard/css/normalize.css">

	<!-- Bootstrap V4.3 -->
	<link rel="stylesheet" href="assets/dashboard/css/bootstrap.min.css">

	<!-- Bootstrap Material Design V4.0 -->
	<link rel="stylesheet" href="assets/dashboard/css/bootstrap-material-design.min.css">

	<!-- Font Awesome V5.9.0 -->
	<link rel="stylesheet" href="assets/dashboard/css/all.css">

	<!-- Sweet Alerts V8.13.0 CSS file -->
	<link rel="stylesheet" href="assets/dashboard/css/sweetalert2.min.css">

	<!-- Sweet Alert V8.13.0 JS file-->
	<script src="assets/dashboard/js/sweetalert2.min.js" ></script>

	<!-- jQuery Custom Content Scroller V3.1.5 -->
	<link rel="stylesheet" href="assets/dashboard/css/jquery.mCustomScrollbar.css">

	<!-- General Styles -->
	<link rel="stylesheet" href="assets/dashboard/css/style.css">


</head>
<body>

	<!-- Main container -->
	<main class="full-box main-container">

		<!-- Nav lateral -->
		<section class="full-box nav-lateral">
			<div class="full-box nav-lateral-bg show-nav-lateral"></div>
			<div class="full-box nav-lateral-content">
				<figure class="full-box nav-lateral-avatar pb-3">
					<i class="far fa-times-circle show-nav-lateral"></i>
					<img src="assets/dashboard/assets/avatar/Avatar.png" class="img-fluid" alt="Avatar">
					<figcaption class="roboto-medium text-center">
						<?php echo $profile->getUserName() . " " . $profile->getUserLastName() ?> <br><small class="roboto-condensed-light">Código Usuario: <?php echo $profile->getUserCode() ?></small>
					</figcaption>
				</figure>
				<nav class="full-box nav-lateral-menu">
					<ul>
						<li>
							<a href="#"><i class="fas fa-user fa-fw"></i> &nbsp; Editar Perfil</a>
						</li>
					</ul>
				</nav>
				<div class="full-box nav-lateral-bar"></div>
				<nav class="full-box nav-lateral-menu">
					<ul>
						<li>
							<a href="?c=Dashboard" class=""><i class="fab fa-dashcube fa-fw"></i> &nbsp; <?php echo ucfirst($session) ?></a>
						</li>

						<li>
							<a href="#" class="nav-btn-submenu"><i class="fas fa-file-invoice-dollar fa-fw"></i> &nbsp; Compras <i class="fas fa-chevron-down"></i></a>
							<ul>
								<li>
									<a href="#"><i class="fas fa-plus fa-fw"></i> &nbsp; Registrar Compra</a>
								</li>
								<li>
									<a href="#"><i class="fas fa-clipboard-list fa-fw"></i> &nbsp; Consultar Compras</a>
								</li>
								<li>
									<a href="#"><i class="fas fa-search fa-fw"></i> &nbsp; Buscar Compra</a>
								</li>
							</ul>
						</li>

						<li>
							<a href="?"><i class="fas fa-store-alt fa-fw"></i> &nbsp; Empresa</a>
						</li>
					</ul>
				</nav>
			</div>
		</section>

		<!-- Page content -->
		<section class="full-box page-content">
			<nav class="full-box navbar-info">
				<a href="#" class="float-left show-nav-lateral">
					<i class="fas fa-exchange-alt"></i>
				</a>
				<a href="#">
					<i class="fas fa-user-cog"></i>
				</a>
				<a href="?c=Logout" class="">
					<i class="fas fa-power-off"></i>
				</a>
			</nav>
