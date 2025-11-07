			<!-- Page header -->
			<div class="full-box page-header">
				<h3 class="text-left">
					<i class="fas fa-plus fa-fw"></i> &nbsp; NUEVO USUARIO
				</h3>

			</div>

			<div class="container-fluid">
				<ul class="full-box list-unstyled page-nav-tabs">
					<li>
						<a class="active" href="?c=Users&a=userCreate"><i class="fas fa-plus fa-fw"></i> &nbsp; NUEVO USUARIO</a>
					</li>
					<li>
						<a href="?c=Users&a=userRead"><i class="fas fa-clipboard-list fa-fw"></i> &nbsp; CONSULTAR USUARIOS</a>
					</li>
					<li>
						<a href="#"><i class="fas fa-search fa-fw"></i> &nbsp; BUSCAR USUARIO</a>
					</li>
				</ul>
			</div>

			<!-- Content -->
			<div class="container-fluid">
				<form action="" method="POST" class="form-neon" autocomplete="off">
					<fieldset>
						<legend><i class="far fa-address-card"></i> &nbsp; Información personal</legend>
						<div class="container-fluid">
							<div class="row">
								<div class="col-12 col-md-6">
									<div class="form-group">
										<label for="rol_code" class="bmd-label-floating">Rol</label>
										<select class="form-control" name="rol_code">
											<option value="" selected="" disabled="">Seleccione una opción</option>
											<?php foreach ($roles as $rol) : ?>
												<option value="<?php echo $rol->getRolCode() ?>"><?php echo $rol->getRolName() ?></option>
											<?php endforeach; ?>
										</select>
									</div>
								</div>
								<div class="col-12 col-md-6">
									<div class="form-group">
										<label for="user_state" class="bmd-label-floating">Estado</label>
										<select class="form-control" name="user_state">
											<option value="" selected="" disabled="">Seleccione una opción</option>
											<option value="1">Activo</option>
											<option value="0">Inactivo</option>
										</select>
									</div>
								</div>
								<div class="col-12 col-md-6">
									<div class="form-group">
										<label for="user_name" class="bmd-label-floating">Nombres</label>
										<input type="text" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,35}" class="form-control" name="user_name" id="user_name" maxlength="35">
									</div>
								</div>
								<div class="col-12 col-md-6">
									<div class="form-group">
										<label for="user_lastname" class="bmd-label-floating">Apellidos</label>
										<input type="text" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,35}" class="form-control" name="user_lastname" id="user_lastname" maxlength="35">
									</div>
								</div>
								<div class="col-12 col-md-6">
									<div class="form-group">
										<label for="user_id" class="bmd-label-floating">Identificación</label>
										<input type="text" pattern="[0-9()+]{1,20}" class="form-control" name="user_id" id="user_id" maxlength="20">
									</div>
								</div>
								<div class="col-12 col-md-6">
									<div class="form-group">
										<label for="user_email" class="bmd-label-floating">Email</label>
										<input type="email" class="form-control" name="user_email" id="user_email" maxlength="70">
									</div>
								</div>
								<div class="col-12 col-md-6">
									<div class="form-group">
										<label for="user_pass" class="bmd-label-floating">Contraseña</label>
										<input type="password" class="form-control" name="user_pass" id="user_pass" maxlength="200">
									</div>
								</div>
								<div class="col-12 col-md-6">
									<div class="form-group">
										<label for="user_pass_conf" class="bmd-label-floating">Repetir contraseña</label>
										<input type="password" class="form-control" name="user_pass_conf" id="user_pass_conf" maxlength="200">
									</div>
								</div>
							</div>
						</div>
					</fieldset>
					<p class="text-center" style="margin-top: 40px;">
						<button type="reset" class="btn btn-raised btn-secondary btn-sm"><i class="fas fa-paint-roller"></i> &nbsp; LIMPIAR</button>
						&nbsp; &nbsp;
						<button type="submit" class="btn btn-raised btn-info btn-sm"><i class="far fa-save"></i> &nbsp; ENVIAR</button>
					</p>
				</form>
			</div>