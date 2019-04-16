'use strict';
var config = {
headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
};
var acentos = {
	headers : {"Content-Type": "text/html;charset=utf-8"}
}

angular.module('listaTareasApp')
  .factory('TareasResource', function($resource,$http) {
    var servicio = {
		login: $resource('scripts/services/api.php?url=login', {}, {
		query: {method: 'GET', params: {Usuario: '@Usuario',Contrasena: '@Contrasena'},isArray:true}	
			}),

		empleados: $resource('scripts/services/api.php?url=grupo'),
		granareas: $resource('scripts/services/api.php?url=granarea'),
		getIdGranArea: $resource('scripts/services/api.php?url=granareaId', {}, {
		query: {method: 'POST',params: {IdGranArea: '@IdGranArea'}}
		}),
		updateGranArea: $resource('scripts/services/api.php?url=updateGranArea', {}, {
		query: {method: 'POST',params: {IdArea: '@idArea', IdGranArea: '@datosGranArea'}}
		}),
		insertGranArea: $resource('scripts/services/api.php?url=insertGranArea', {}, {
		query: {method: 'POST',params: {IdArea: '@idArea', IdGranArea: '@datosGranArea'}}
		}),		
		updateArea: $resource('scripts/services/api.php?url=updateArea', {}, {
		query: {method: 'POST',params: {IdArea: '@idArea',idGranArea: '@idGranArea', nombreArea: '@nombreArea'}}
		}),
		insertArea: $resource('scripts/services/api.php?url=insertArea', {}, {
		query: {method: 'POST',params: {datosArea: '@datosArea'}}
		}),
		getIdArea: $resource('scripts/services/api.php?url=areaId', {}, {
		query: {method: 'POST',params: {IdArea: '@IdArea'}}
		}),
		validaExisteRegistro: $resource('scripts/services/api.php?url=validaExisteRegistro/:Tabla/:Campo/:Valor', {
										Tabla: '@Tabla',
										Campo: '@Campo',
										Valor: '@Valor'}, {
		query: {method: 'GET',isArray:true}	
		}),

		execute: $resource('scripts/services/api.php?url=execute', {},{										
		query: {method: 'POST',params:{Accion: '@Accion',SQL:'@SQL', Pr:'@Pr',PAR:'@PAR'},isArray:true}
		}),
		createProyectoProducto: $resource('scripts/services/api.php?url=createProyectoProducto', {},{										
		query: {method: 'POST',params:{Lista: '@Lista',idProy: '@idProy',idInve:'@idInve'},isArray:true}
			}),
		enviararchivo: function(datos){                     
    	  	  return $http.post('scripts/services/enviar.php', datos);  
		},
    enviarProyectoProducto: function(datos){    	  	                     
    	  	  return $http.post('scripts/services/proyecto.php', datos);  
		},
			SQL : function(datos) {
	  		  return $http.post('scripts/services/executesql.php', datos);  
			},
			
		prIniciar : function(datos) {
				return $http.post('scripts/services/prIniciar.php', datos);  
		},

		prUsuario : function(datos) {
			return $http.post('scripts/services/prUsuario.php', datos);  
	},

		prTipoDocumento: function(datos) {
			return $http.post('scripts/services/prTipoDocumento.php', datos);  
		},

		prInvestigador: function(datos) {
			return $http.post('scripts/services/prInvestigador.php', datos);  
		},
		
		prProductos: function(datos) {
			return $http.post('scripts/services/prProductos.php', datos);  
		},
	

		prTipoCargo: function(datos) {
			return $http.post('scripts/services/prTipoCargo.php', datos);  
		},



		prCentro: function(datos) {
			return $http.post('scripts/services/prCentro.php', datos);  
		},

		prArea: function(datos) {
			return $http.post('scripts/services/prArea.php', datos);  
		},


		prProgramaAcademico: function(datos) {
			return $http.post('scripts/services/prProgramaAcademico.php', datos);  
		},

		prNivelFormacion: function(datos) {
			return $http.post('scripts/services/prNivelFormacion.php', datos);  
		},

		prGrupo: function(datos) {
			return $http.post('scripts/services/prGrupo.php', datos);  
		},

		prTipoVinculacion: function(datos) {
			return $http.post('scripts/services/prTipoVinculacion.php', datos);  
		},

		prConvocatoria: function(datos) {
			return $http.post('scripts/services/prConvocatoria.php', datos);  
		},

		prTipoProducto: function(datos) {
			return $http.post('scripts/services/prTipoProducto.php', datos);  
		},

		prSemillero: function(datos) {
			return $http.post('scripts/services/prSemillero.php', datos);  
		},

		prProyectoProducto: function(datos) {
			return $http.post('scripts/services/prProyectoProducto.php', datos);  
		},

		prLineaInvestigacion: function(datos) {
			return $http.post('scripts/services/prLineaInvestigacion.php', datos);  
		},

		prProyecto: function(datos) {
			return $http.post('scripts/services/prProyecto.php', datos);  
		},

	  	PDF : function(datos) {
	  				return  $http({	  				
		  				method: "post",
						url: 'scripts/services/pdf.php',
			            data: datos,
	        		    transformRequest: angular.identity,
	            		headers: { 'Content-Type': 'application/json' },
	            		responseType: 'arraybuffer'  					
  				},
  				 function errorCallback(response) {    		
  					});     				                      	  

			},
	
		PdfConvocatoria : function(datos) {
	  				return  $http({
	  				
		  				method: "post",
						url: 'scripts/services/pdfConvocatoria.php',
			            data: datos,
	        		    transformRequest: angular.identity,
	            		headers: { 'Content-Type': 'application/json' },
	            		responseType: 'arraybuffer'  				

  				},

  				 function errorCallback(response) {
  					});     				                      	  

			},	
	   PdfGrupo : function(datos) {
	  				return  $http({	  				
		  				method: "post",
						url: 'scripts/services/pdfGrupo.php',
			            data: datos,
	        		    transformRequest: angular.identity,
	            		headers: { 'Content-Type': 'application/json' },
	            		responseType: 'arraybuffer'  				

  				},

  				 function errorCallback(response) {

  					});     				                      	  

			},				
	  	SQLMulti : function(datos) {
	  		  return $http.post('scripts/services/executesqlmulti.php', datos);  
	  	},
	  	enviararchivobinario: function(datos){
    	return  $http({
  					method: 'post',
  					url: 'scripts/services/enviarbinario.php',
  					data:datos,
  					transformRequest: angular.identity,
  					enctype:'multipart/form-data',
            		headers: {'Content-Type': undefined}

  				},
  				 function errorCallback(response) {
  					});     				                      	  

			},
		borrarbinario: function(datos){ 	  	
    	return  $http({
  					method: 'post',
  					url: 'scripts/services/borrarbinario.php',
  					data:datos,
  					transformRequest: angular.identity,
            		headers: {'Content-Type': undefined}
  				},
  				 function errorCallback(response) {

  					});     				                      	  

			},

		descargarbinario: function(datos){ 	  	
    	return  $http({
  					method: 'post',
  					url: 'scripts/services/descargarbinario.php',
  					data:datos,
  					transformRequest: angular.identity,
            		headers: {'Content-Type': undefined}

  				},

  				 function errorCallback(response) {

  					});     				                      	  

			}					
		};

    return servicio;

  });

  