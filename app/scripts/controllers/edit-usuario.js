'use strict';

angular.module('listaTareasApp')
  .controller('editUsuario', function($scope,$location,datosUsuario,TareasResource,$route,$window) {
    	var id;
    	var identificacion;
    	$scope.disabledTipoUsuario = ($window.sessionStorage.getItem('tipoUsuario')==-1) ? true:false;
  		 datosUsuario.$promise.then(function(result){

  		 	$scope.viewDatos= result;

  		 	identificacion = result[0].USE_IDEN;

  		 	  id = ($route.current.params.idUsuario) ? parseInt($route.current.params.idUsuario) :0 ;
  		
		  		if(id > 0)  	  		
		  			{
		          $scope.buttonText = 'Actualizar';
		          $scope.tiTulo ='Editando Usuario';
		        }
		  		else
			      {
			  			$scope.buttonText = 'Guardar';
			         $scope.tiTulo ='Creando Usuario';
			      }		
				
				$scope.admin=true;
				$scope.investigador = true;
				if (id==-1)
				{
					$scope.admin=false;
					$scope.investigador = true;
				}			            	

  		 });

     	
	 $scope.volver = function()
	 {
	 	if (id==-1)
	 	{
	 		 $location.path('/inicio');
	 		 return;
		}
	 	 $location.path('/usuario');
	 	
	 }
     	
	 $scope.save = function(usuario){

	 	if (id==0 || id==-1)
	 	{

			datos ={
				Accion:'ValidarIdentificacion',
				IdUser: usuario.USE_IDEN
			}
	 		var executesql = TareasResource.prUsuario(datos);
	 			executesql.then(function(result){
	 					

						if (result.data[0].Cuantos>0)
						{
							$window.alert("La identificacion ya existe");
							return;
						}
						else
						{
							datos ={
	 							Accion:'ValidarUsuario',
	 							IdUsua: usuario.USE_USUA
	 						}

							executesql = TareasResource.prUsuario(datos);	
								executesql.then(function(result){

									if (result.data[0].Cuantos>0)
									{
										$window.alert("El usuario ya existe");
										return;
									}
									else
									{
										datos = {
											 Accion:"INSERT",
											 USE_IDEN:usuario.USE_IDEN,
											 USE_NOMB:usuario.USE_NOMB,
											 USE_APEL:usuario.USE_APEL,
											 USE_EMAI:usuario.USE_EMAI,
											 USE_TELE:usuario.USE_TELE,
											 USE_USUA:usuario.USE_USUA,
											 USE_PASS:md5(usuario.USE_USUA),
											 USE_COD_TIPO:usuario.USE_COD_TIPO	 										
	 										}

	 									executesql = TareasResource.prUsuario(datos);
	 										executesql.then(function(result){	 										
												var maximo =result.data[0].Maximo;
	 										if (usuario.USE_COD_TIPO==1)
	 											{														
	 						   						datos ={
													Accion: 'INSERT',
													USE_IDEN:usuario.USE_IDEN,
													USE_NOMB: usuario.USE_NOMB,
													USE_APEL:usuario.USE_APEL,
													FECHA: moment(new Date()).format('YYYY-MM-DD'),
													IdUser:maximo,
													PASS: md5(usuario.USE_USUA),
													USE_TELE:usuario.USE_TELE 
			      									};       

									      	TareasResource.prInvestigador(datos).then(function(result) { 
									      	$window.alert('Ingresado');
									      		if (id==-1)  
									      		{
									      			$location.path('/edit-usuario/' + maximo);
									      			return;
												  }	
												  else
												  {
													$location.path('/edit-usuario/' + maximo);
													return;
												  }				 				 			
										      });
						 					}
						 					else
						 					{
						 							$window.alert('Ingresado');
						 							$location.path('/edit-usuario/' + maximo);
						 					}
					 				
	 								});
								}

							});
						}

					

	 		});
		}
	 	else
	 	{
			var datos = {
	 			Accion:"U",
	 			SQL:"UPDATE sgi_user set " +
	 				" USE_IDEN = '" + usuario.USE_IDEN  + "', " +
	 				" USE_NOMB = '" +  usuario.USE_NOMB + "', " + 
	 				" USE_APEL = '" +  usuario.USE_APEL + "', " + 
	 				" USE_EMAI = '" +  usuario.USE_EMAI + "', " + 
	 				" USE_TELE = '" +  usuario.USE_TELE + "', " + 
	 				" USE_USUA = '" +  usuario.USE_USUA + "', " + 
	 				" USE_COD_TIPO = " + usuario.USE_COD_TIPO  +
	 				" WHERE USE_CODI = " + id	 					
	 		}

	 		var usuario = TareasResource.SQL(datos);
	 			usuario.then(function(rersult){

	 				$window.alert('Actualizado');
	 				 $location.path('/usuario');

	 			});

	 	}
	 }

	 $scope.onClickPassword = function(user)
	 {

	 	

	 	if (user=="")
	 	{
	 		$window.alert("Debe digitar un usuario");
	 		return;
	 	}

	 	var datos = {
	 			Accion:"U",
	 			SQL:"UPDATE sgi_user set " +	 				
	 				" USE_CLAV = '" + md5(user) + "'"  +
	 				" WHERE USE_CODI = " + id	 					
	 		}

	 		var usuario = TareasResource.SQL(datos);
	 			usuario.then(function(rersult){

	 				$window.alert('la clave se cambio por el nombre de Usuario');
	 				

	 			});
	 }

 });