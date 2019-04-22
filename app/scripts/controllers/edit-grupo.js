'use strict';

angular.module('listaTareasApp')
  .controller('ControladorEditGrupo', function($scope,$cookieStore,$location,TareasResource,$route,$window,$http) {
   moment.locale('es');
//var user = $cookieStore.get('usuario');
 var user = JSON.parse($window.sessionStorage.getItem('investigador'));



    if (user==null || user==undefined)
    {

      $location.path('/menu');
      return;
    }  


    $scope.dateSettingslineasInvestigacion = {
      width: 120,height: 20,formatString:'yyyy-MM-dd',culture: 'es-CO'
    }

    $scope.dateInputSettings =
      {
      width: 120,
      height: 20,
      formatString:'yyyy-MM-dd',
      culture: 'es-CO',                
    }
            


      $scope.jqxPanelSettingsProyecto=
      {
        height: "100",
        autoUpdate:true,
        theme:'bootstrap',
        width:"1000"       
      }

      $scope.jqxPanelSettingsPlan =
      {
        height: "100",
        autoUpdate:true,
        theme:'bootstrap',
        width:"1000"
      }

         $scope.jqxPanelSettings =
            {             

              height: "100",
              autoUpdate:true,
              theme:'bootstrap'
             
            }
        $scope.jqxButtonsSettings =
        {
          theme: 'metro'
        }
           $scope.jqxWindowSettings = {
                maxHeight: 500, maxWidth: 480, minHeight: 30, minWidth: 50, height: 250, width: 400,
                resizable: false, isModal: true, autoOpen: false, modalOpacity: 0.3,showCloseButton:true
            }  

$scope.onChangeFechaTerminaInvestigacion = function(linea,habilita)
{

  linea.FechaTermina =habilita==false? '':linea.FechaTermina;
}


$scope.onChangeFechaTerminaSemilla = function(semilla,habilita)
{
 
  semilla.FechaTermina =habilita.checkFechaTerminaSemilla==false? '':semilla.FechaTermina;
}


$scope.onChangeFechaTerminaUsuario = function(usuario,habilita)
{
  var user = JSON.parse($window.sessionStorage.getItem('investigador'));
  //user.INV_CODI

    if (user.INV_CODI==usuario.Id2 && habilita.checkFechaTerminaInvestiga==true) 
    {
      habilita.checkFechaTerminaInvestiga=false;
      usuario.FechaTermina=null;

      return;

    }
    else  {
    usuario.FechaTermina =habilita.checkFechaTerminaInvestiga==false? '':usuario.FechaTermina;
    }
}



var IdGrupo = $route.current.params.idGrupo;
var idInve="";
        if ($route.current.params.idGrupo==0)
        {
            $scope.datos2 =
            [{
              Grupo:"",
              igr_codi:"",
              gru_codi:"",
              gru_colc_codi:"",
              gru_cate_colc:"",
              inv_codi:"",
              Fecha:"",
              Investigador:"",
              selArea:"",
              selCentro:"",
              gru_aval_inst:"0"  
            }]          
        }

        var parametros = {
          Accion:'SELECT'
        }
        
          $scope.area =TareasResource.prArea(parametros);
          $scope.area.then(function(result){  
          $scope.listArea =result.data;

          $scope.centro =TareasResource.prCentro(parametros);
          $scope.centro.then(function(result){  
            $scope.listCentro =result.data;
            if (IdGrupo!=0)
            {


              var parametros = {
                Accion:"SELECT1",
                IdGrupo:IdGrupo
              }
              var dat = TareasResource.prGrupo(parametros);   

            dat.then(function(investigador){
              $('#myModal').hide();  
              if (investigador.data[0]!=null)
              {
                $('#myModal').show();  
                $scope.datos2 =[];
              $scope.datos2[0]= investigador.data[0];
              $scope.datos2[0].gru_aval_inst =investigador.data[0].gru_aval_inst;
              $scope.datos2[0].Fecha= new Date(moment(investigador.data[0].Fecha));
              var lista = [];
              investigador.data.forEach(function(valor, indice, array){
                if (valor.inv_codi!=user.INV_CODI)
                  lista.push(valor);
              });  

              $scope.Investigadores =lista;
              parametros= {
                Accion:'SELECTGRUPO',
                INV_CODI: user.INV_CODI
              }
            $scope.datos = TareasResource.prInvestigador(parametros); 


                $scope.datos.then(function(result){

                      if (result.data[0]==null )
                      {
                        $window.alert("Debe completar la Información del Investigador");
                        $('#myModal').hide();  
                        $location.path('/grupo');
                        return;
                      }

                        $scope.NombreInvestigador = result.data[0].Nombre;
                        $scope.ApellidoInvestigador = result.data[0].Apellido;
                        $scope.CentroInvestigador = result.data[0].Centro;
                        $scope.ZonaInvestigador = result.data[0].ZONA;  
                        $scope.ProgramaInvestigador = result.data[0].Programa;  
                        $scope.EscuelaInvestigador = result.data[0].Escuela;  

                        var id_inve=0;

                        $scope.investigador2 = investigador.data;        

                        parametros = {
                          Accion:'SELECT'
                        }

                          $scope.tipoVinculacion = TareasResource.prTipoVinculacion(parametros); 
                            $scope.tipoVinculacion.then(function(result){

                                $scope.tipoVinculacion = result.data;

                                parametros = {
                                  Accion:'SELECTLINEASINVESTIGACION'
                                }

                                  $scope.listLineasInvestigacion = TareasResource.prLineaInvestigacion(parametros); 
                                  $scope.listLineasInvestigacion.then(function(result){

                                    $scope.listLineasInvestigacion =result.data;

                                    parametros = {
                                      Accion:'SELECTLIST'
                                    }

                                      $scope.listInvestigador = TareasResource.prInvestigador(parametros); 

                                      $scope.listInvestigador.then(function(result){

                                            $scope.listInvestigador=result.data;

                                          parametros = {
                                              Accion:'SELECT'
                                              }
                                              $scope.listSemillero = TareasResource.prSemillero(parametros); 

                                              $scope.listSemillero.then(function(result){
                                              $scope.listSemillero=result.data;


                                              parametros = {
                                                Accion:'SELECTGRUPOSEMILLA',
                                                idGrupo: $route.current.params.idGrupo
                                              }

                                                var Semilleros = TareasResource.prGrupo(parametros);
                                                var tieneDatos2=false;
                                                $scope.Semilleros  =[]; 
                                              Semilleros.then(function(result2){
                                                  angular.forEach(result2.data, function(value, key){
                                                    if (value.Nombre==undefined || value.Nombre=="")                                
                                                    {
                                                      $scope.Semilleros  =[];                                
                                                    }
                                                    else
                                                    {
                                                      tieneDatos2 =true;
                                                    }
                                                                
                                                  });
                                                  if (tieneDatos2==true)
                                                        $scope.Semilleros = result2.data;    
                                                  
                                                        parametros = {
                                                          Accion:'SELECTLINEASBYGRUPO',
                                                          IdGrupo:IdGrupo
                                                        } 
          
                                                          var LineasInvestigacion = TareasResource.prLineaInvestigacion(parametros); 
          
                                                            var  tieneDatos=false;
                                                              $scope.LineasInvestigacion  =[];      
                                                                LineasInvestigacion.then(function(result){
                                                                
                                                                    angular.forEach(result.data, function(value, key){
                                                                      if (value.Id==undefined || value.Id=="")   
                                                                      {                             
                                                                        $scope.LineasInvestigacion  =[];                                
                                                                      }
                                                                      else
                                                                      {
                                                                        tieneDatos =true;
                                                                      }
                                                                                  
                                                                    });
                                                                    $('#myModal').hide();  
                                                                    if (tieneDatos==true)
                                                                          $scope.LineasInvestigacion = result.data;           
                                                                });

                                              }); 


                                             
                                            });    
                                      });
                                  });
                            });

                    });
                                                                                    
                  }
              });

            }
            else
            {

              parametros= {
                Accion:'SELECTGRUPO',
                INV_CODI: user.INV_CODI
              }
              $scope.datos = TareasResource.prInvestigador(parametros); 


                  $scope.datos.then(function(result){

                      if (result.data[0]==null )
                      {
                        $window.alert("Debe completar la Información del Investigador");
                        $('#myModal').hide();  
                        $location.path('/grupo');
                        return;
                      }

                        $scope.NombreInvestigador = result.data[0].Nombre;
                        $scope.ApellidoInvestigador = result.data[0].Apellido;
                        $scope.CentroInvestigador = result.data[0].Centro;
                        $scope.ZonaInvestigador = result.data[0].ZONA;  
                        $scope.ProgramaInvestigador = result.data[0].Programa;  
                        $scope.EscuelaInvestigador = result.data[0].Escuela;  
                        
                    

                        
                            if (investigador.data[0]!=null)
                                $scope.datos2[0].selArea = investigador.data[0].selArea;     
                                parametros = {
                                  Accion:'SELECTGRUPOINVESTIGADOR',
                                  IdInve:user.INV_CODI
                                }

                                    var  Investigadores = TareasResource.prGrupo(parametros);   
                                      var tieneDatos1=false;
                                
                                  $scope.Investigadores  =[];   
                                Investigadores.then(function(result1){
                                  if (result1.data!=null)
                                    angular.forEach(result1.data, function(value, key){
                                      if (value.Nombre==undefined ||value.Nombre=="")                                
                                      {
                                        $scope.Investigadores  =[];                                
                                      }
                                      else
                                      {
                                        idInve =idInve + value.Id2  + ',';
                                        tieneDatos1 =true;
                                      }
                                                  
                                    });
                                    if (tieneDatos1==true)
                                    {
                                          $scope.Investigadores = result1.data;  
                                          idInve = idInve.substring(0,idInve.length-1); 
                                          if (idInve!="")
                                          {
                                          parametros = {
                                            Accion:"SELECTPROYECTOINVESTIGADOR",
                                            IdInve:idInve
                                          }

                                          $scope.listProyectos =  TareasResource.prProyecto(parametros);

                                          $scope.listProyectos.then(function(result){

                                            parametros = {
                                              Accion:'SELECTGRUPOPROYECTO',
                                              IdGrupo:IdGrupo,
                                              INV_CODI:user.INV_CODI
                                            }
                                            $scope.Proyectos =  TareasResource.prProyecto(parametros);


                                            $scope.Proyectos.then(function(result){
                                              if (result.data[0].NombreProyecto !=undefined)                          
                                                $scope.Proyectos =result.data;
                                              else
                                                $scope.Proyectos =[];    

                                                parametros = {
                                                  Accion:'SELECTPLNTGRUPO',
                                                  IdGrupo:IdGrupo
                                                }

                                                $scope.planTrabajo = TareasResource.prGrupo(parametros); 

                                              $scope.planTrabajo.then(function(plan){

                                                if (plan.data[0].pgr_plnt_codi!=undefined)                            
                                                    $scope.planTrabajo=plan.data;                              
                                                else
                                                  $scope.planTrabajo=[];

                                                 
                                                
                                              });
                                            });
                                          });
                                        }


                                                      
                                    }
                                }); 
                            

                            });
                          }
                });
     });
        

        
          
               

        
            





    
        
 $scope.uploadFile = function(arch)
 {
  var tipo;
  var replace;

    if (arch.files[0].size>750000)
    {
      $window.alert("El Archivo debe ser menor a 750 k");
      return;
    }

     $scope.nameArch = arch.files[0].name;


     tipo = arch.files[0].type.split("\/");
    // var fs = require('fs');

    // fs.createReadStream(arch.value).pipe(fs.createWriteStream('/AppInvestigacion/' + arch.value));
      var data;
     var reader = new FileReader();
        reader.onload = function (e) {
            var dato = e.target.result;
            data= new Uint8Array(dato);
            replace = "data:" + tipo[0] + "\/" + tipo[1] + ";base64,";
            $scope.ArrayBuffer = dato;                    
        }
     reader.readAsDataURL(arch.files[0]);        

    //   var fd = new FormData();
    // //Take the first selected file
    // fd.append("file", arch.files[0]);

    //   $http.post('/AppInvestigacion', fd, {
    //     withCredentials: true,
    //     headers: {'Content-Type': undefined }
    // }).success('').error('ffd');
    $scope.$apply();
 }
        // $scope.listProyectos =TareasResource.execute.query({Accion: 'S',
        //                  SQL: 'SELECT pro_codi,pro_nomb FROM sgi_proy'}); 

        //   $scope.listProyectos.$promise.then(function(result)
        //   {
        //         var dat = result;
        //   });

       
       
      

        







   $scope.OnClicEliminarLineaInvestigacion = function(linea,item)
   {  
      if (linea.Id==0)
      {
        $scope.LineasInvestigacion.splice(item.$index,1);
      }
      else 
      {
            $('#jdFechaTermina').popover('destroy');  
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = linea.Nombre;
            $scope.FechaInicia = linea.FechaInicia;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Líneas de Investigación";
            $scope.idMain = linea;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =1;
            $('#window').jqxWindow({height:210});
             // $scope.LineasInvestigacion.splice(linea.$index,1);          
             
            // $scope.jqxWindowSettings.apply('setContent','Hiola');
             $scope.jqxWindowSettings.apply('open');
      }
   }   

   $scope.OnClicEliminarProyecto = function(proy,item)
   {
    if (proy.IdGrupo==0)
    {
       $scope.Proyectos.splice(item.$index,1);
    }
    else
    {
       //$('#jdFechaTermina').popover('destroy');  
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = proy.NombreProyecto;
            $scope.FechaInicia = proy.fech_ini;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Proyectos";
            $scope.idMain = proy;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =4;
            $('#window').jqxWindow({height:210});
            $scope.jqxWindowSettings.apply('open');
    }
   }

   $scope.OnClicEliminarPlan = function(plan,sele)
   {
   
       $scope.planTrabajo.splice(sele.$index,1);           

     // else
     // {
     //        $scope.hideFechaTermina ="false";      
     //        $scope.tipoGrupo = "Nombre";
     //        $scope.Nombre = plan.Nombre;
     //        $scope.FechaInicio = plan.FechaInicio;
     //        $scope.FechaTermina =null;
     //        $scope.hidelblNombre =false;
     //        $scope.hideVinculacion = true;
     //        $scope.hideCmdTipoGrupo=true;
     //        $scope.hideVinculacion = true;
     //        $scope.titleEditar = "Plan";
     //        $scope.idMain = plan;
     //        $scope.idMain.accion="Del";
     //        $scope.idMain.tipo =5;
     //        $('#window').jqxWindow({height:210});
     //        $scope.jqxWindowSettings.apply('open');
     // }
    
   }

   $scope.OnClicAddPlan = function(Arch,Nombre)
   {
      if ($scope.planTrabajo==undefined)
        $scope.planTrabajo = [];

     if (Arch=="" || Arch==undefined) 
     {
       $window.alert('Seleccione un documento');
       return;
     }
     if (Nombre=="" || Nombre==undefined) 
     {
       $window.alert('Digite un Nombre');
       return;
     }
     var fecha = new Date();



      $scope.planTrabajo.splice(0,0,{Path:$scope.ArrayBuffer,FechaInicio:fecha,FechaTermina:null,Nombre:Nombre,IdGrupo:0});     
      $scope.nameArch="";
      $('#nombrePlan').val("");
   }

$scope.OnClicDescargarPlan = function(a,b)
{  
  $window.open(a);
  
}

   $scope.addProyecto = function(proy,prod)
   {
    //"PROY.PRO_NOMB As NombreProyecto,PROD.Nombre AS NombreProducto,PROD.Id As IdPROD,PROY.PRO_CODI AS IDPROY "
    if (proy==undefined)
    {
      $window.alert('Seleccione un proyecto');
      return;
    }

    if (prod==undefined)
    {
      $window.alert('Seleccione un producto');
      return;
    }

    var existe =false;

    angular.forEach($scope.Proyectos, function(value, key){

      if (value.fech_term==null)
      {
        if (value.IdProy==proy.pro_codi && value.IdProd==prod.Id)     
            existe=true;
      }

    })

    if (existe==true)
    {
        $window.alert('Ya está seleccionado');
        return;
    }

    if ($scope.Proyectos==undefined) $scope.Proyectos = [];
    var fecha = new Date();
    $scope.Proyectos.splice(0,0,{NombreProyecto:proy.pro_nomb,NombreProducto:prod.nombre,IdProy:proy.pro_codi,IdProd:prod.Id,IdGrupo:0,fech_ini:fecha,fech_term:null});

   }

   $scope.Ok = function()
   {
     
    var heightPanel;
   
          if ($scope.idMain.accion=='Add' && $scope.idMain.tipo==1)
     {

        if ($scope.FechaInicia=="" || $scope.FechaInicia==null)
        {
          $('#jdFechaInicia').popover({title:'Advertencia',content:'Seleccione una Fecha de Inicio',delay: { 'show': 50, 'hide': 10 },placement:'right'});
          $('#jdFechaInicia').popover('show');
          return;
        }
        else          
        {
          if ($( "#cmdTipoGrupo option:selected" ).text()=="")
          {
              $('#cmdTipoGrupo').popover({title:'Advertencia',content:'Seleccione una Opción',delay: { 'show': 50, 'hide': 10 },placement:'right'});
              $('#cmdTipoGrupo').popover('show');
              return;
          }
          else
          {

            $scope.jqxWindowSettings.apply('close');
            if ($scope.LineasInvestigacion==undefined) $scope.LineasInvestigacion=[];
            $scope.LineasInvestigacion.splice(0,0,{Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:$scope.FechaInicia,FechaTermina:null,Id:$scope.idMain.Id,Id2:$scope.selTipoGrupo.Id});                                         
          }
        }
     }

     if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==1)
     {
       if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.FechaTermina = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');
          }
     }

       
         if ($scope.idMain.accion=='Add' && $scope.idMain.tipo==2)
            {
            if ($scope.FechaInicia=="" || $scope.FechaInicia==null)
                {
                  $('#jdFechaInicia').popover({title:'Advertencia',content:'Seleccione una Fecha de Inicio',delay: { 'show': 50, 'hide': 10 },placement:'right'});
                  $('#jdFechaInicia').popover('show');
                return;
                }
            else          
            {
              if ($( "#cmdTipoGrupo option:selected" ).text()=="")
              {
                $('#cmdTipoGrupo').popover({title:'Advertencia',content:'Seleccione una Opción',delay: { 'show': 50, 'hide': 10 },placement:'right'});
                $('#cmdTipoGrupo').popover('show');
                return;
              }
              else
              {
                 $scope.Investigadores.splice(0,0,{Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:$scope.FechaInicia,FechaTermina:null,Id:$scope.idMain.Id,Id2:$scope.selTipoGrupo.Id,IdVincula:$scope.selTipoVinculacion.tiv_codi});                   
                    $scope.jqxWindowSettings.apply('close');
              
               //  var existe=false;
               // angular.forEach($scope.Investigadores, function(value, key){
               //    if (value.Id2 == $scope.selTipoGrupo.Id)
               //    {
               //      existe=true;
               //    }
               // });
               // if (existe==false)
               //     {
                   
               //    }
               // else
               //  $window.alert("Ya está seleccionado");     
             }  
           }
     }

     if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==2)
     {
       if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.FechaTermina = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');

          }
     }
       
        if ($scope.idMain.accion=='Add' && $scope.idMain.tipo==3)
            {
            if ($scope.FechaInicia=="" || $scope.FechaInicia==null)
                {
                  $('#jdFechaInicia').popover({title:'Advertencia',content:'Seleccione una Fecha de Inicio',delay: { 'show': 50, 'hide': 10 },placement:'right'});
                  $('#jdFechaInicia').popover('show');
                return;
                }
            else          
            {
              if ($( "#cmdTipoGrupo option:selected" ).text()=="")
              {
                $('#cmdTipoGrupo').popover({title:'Advertencia',content:'Seleccione una Opción',delay: { 'show': 50, 'hide': 10 },placement:'right'});
                $('#cmdTipoGrupo').popover('show');
                return;
              }
          else
          {

            $scope.jqxWindowSettings.apply('close');
            if ($scope.Semilleros==undefined) $scope.Semilleros=[];
            $scope.Semilleros.splice(0,0,{Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:$scope.FechaInicia,FechaTermina:null,Id:$scope.idMain.Id,Id2:$scope.selTipoGrupo.Id});
          }
        }
     }

     if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==3)
     {
       if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.FechaTermina = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');
          }
     }

      if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==4)
     {
         if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.fech_term = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');
          }
     }
      if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==5)
     {
         if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.FechaTermina = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');
          }
     }

}
   


                 

   $scope.OnClicEliminarIntegranteGrupo = function(integrante)
     { 


         if (integrante.Id2== user.INV_CODI ) 
         {
          $window.alert('No se puede eliminar el Investigador Actual');
          return;
         }

         if (integrante.Id==0)
      {
         $scope.Investigadores.splice(integrante.$index,1); 
         if ($scope.Investigadores.length==0)
         {
          $scope.listProyectos =[];
         }
         else
         {
          var myId = new Array($scope.Investigadores.length);
                var cont =0;
                angular.forEach($scope.Investigadores, function(value, key){
                  myId[cont] = value.Id2;
                  cont = cont +1;
                  idInve = myId.join();
                });

                 //idInve = idInve.substring(0,idInve.length-1); 
                 if (idInve!="")
                     {
                      var parametros = {
                        Accion:'SELECTPROYECTOINVESTIGADOR',
                        idInve:idInve
                      }

                      $scope.listProyectos =  TareasResource.execute.query(parametros);
                      $scope.listProyectos.then(function(result){
                            var r = result.data;
                      });
                     }   
          }       
      }
      else 
      {
            $('#jdFechaTermina').popover('destroy');  
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = integrante.Nombre;
            $scope.FechaInicia = integrante.FechaInicia;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Integrante del Grupo";
            $scope.idMain = integrante;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =2;
            $('#window').jqxWindow({height:210});
             // $scope.LineasInvestigacion.splice(linea.$index,1);          
             
            // $scope.jqxWindowSettings.apply('setContent','Hiola');
             $scope.jqxWindowSettings.apply('open');
      }        
     }   

   $scope.OnClicAddLineaInvestigacion = function(linea)
   {
     $scope.hideCmdTipoGrupo=false;
       $scope.hideVinculacion = true;
      $('#jdFechaInicia').popover('destroy');
     $('#cmdTipoGrupo').popover('destroy');

      var parametros = {
        Accion:'SELECTLINEASINVESTIGACION'
      }

       var executeSql = TareasResource.prLineaInvestigacion(parametros); 

          executeSql.then(function (result){

              var lista = [];

              angular.forEach(result.data,function(item,value){
                lista.push({Nombre:item.lin_desc,Id:item.lin_codi});
              });

             $scope.listTipoGrupo =lista;

              $('#cmdLinea').popover('destroy');
              $scope.titleEditar = "Líneas de Investigación";
              $scope.tipoGrupo = "Seleccione Línea Investigación";

              $scope.idMain = {
                              Nombre:"",
                              FechaInicia:null,
                              FechaTermina:null,
                              Id:0,
                              Id2:0,
                              tipo:1,
                              accion:'Add'
                            };  
               $scope.FechaInicia=null;  
               $scope.Nombre="";                          
               $scope.hideVinculacion = true;   
               $scope.hideFechaTermina =true;  
               
               $('#window').jqxWindow({height:230});             
               $scope.jqxWindowSettings.apply('open');
          });
          
      //$scope.LineasInvestigacion.push({Nombre:linea.lin_desc,FechaInicia:null,FechaTermina:null,IdLinea:linea.lin_codi});      

   }    
  
  $scope.OnClicAddIntegrante = function(integrante)
  {
      $scope.hideCmdTipoGrupo=false;
      $scope.hideVinculacion = false;
      $('#jdFechaInicia').popover('destroy');
     $('#cmdTipoGrupo').popover('destroy');


          var parametros = {
            Accion:'SELECT'
          }

          var tipo = TareasResource.prTipoVinculacion(parametros); 
            tipo.then(function(data){
              $scope.tipoVinculacion=data.data;

              parametros ={
                Accion:'SELECTNOMBRESINVE',
                INV_CODI:user.INV_CODI
              }
              var listGrupo =TareasResource.prInvestigador(parametros); 
                listGrupo.then(function(resultado){
                  $scope.listTipoGrupo = resultado.data;
                  $('#cmdLinea').popover('destroy');
                  $scope.titleEditar = "Integrantes del Grupo";
                  $scope.tipoGrupo = "Seleccione Integrante";
  
                  $scope.idMain = {
                              Nombre:"",
                              FechaInicia:null,
                              FechaTermina:null,
                              Id:0,
                              Id2:0,
                              tipo:2,
                              accion:'Add'
                            };  
                  $scope.FechaInicia=null;  
                  $scope.Nombre="";                                 
                  $scope.hideFechaTermina =true;  
  
                  $('#window').jqxWindow({height:310});             
                  $scope.jqxWindowSettings.apply('open');
             });
      });
  }

  $scope.OnClicAddSemillero = function(semillero)
  {
     $scope.hideCmdTipoGrupo=false;
       $scope.hideVinculacion = true;
      $('#jdFechaInicia').popover('destroy');
     $('#cmdTipoGrupo').popover('destroy');

      var parametros = {
        Accion:'SELECT'
      }

        var tipoGrupo= TareasResource.prSemillero(parametros); 
        tipoGrupo.then(function(result){

          var lista = [];

          angular.forEach(result.data,function(item,value){
            lista.push({Nombre:item.sem_nomb,Id:item.sem_codi});
          });


          $scope.listTipoGrupo =lista;
          $('#cmdLinea').popover('destroy');
          $scope.titleEditar = "Semilleros del Grupo";
          $scope.tipoGrupo = "Seleccione Semillero";
  
          $scope.idMain = {
                          Nombre:"",
                          FechaInicia:null,
                          FechaTermina:null,
                          Id:0,
                          Id2:0,
                          tipo:3,
                          accion:'Add'
                        };  
           $scope.FechaInicia=null;  
           $scope.Nombre="";                          
           $scope.hideVinculacion = true;   
           $scope.hideFechaTermina =true;  
           
           $('#window').jqxWindow({height:230});             
           $scope.jqxWindowSettings.apply('open');
         

        });          
    //$scope.Semilleros.push({Nombre:semillero.Nombre,Fecha:null,IdSemillero:semillero.sem_codi})
  }

$scope.OnClicEliminarSemilleroGrupo = function(semillero)
{

   if (semillero.Id==0)
      {
         $scope.Semilleros.splice(semillero.$index,1);           
      }
      else 
      {
            $('#jdFechaTermina').popover('destroy');  
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = semillero.Nombre;
            $scope.FechaInicia = semillero.FechaInicia;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Semillero del Grupo";
            $scope.idMain = semillero;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =3;
            $('#window').jqxWindow({height:210});
             // $scope.LineasInvestigacion.splice(linea.$index,1);          
             
            // $scope.jqxWindowSettings.apply('setContent','Hiola');
             $scope.jqxWindowSettings.apply('open');
      }         
}
 $scope.volver = function(){
        $location.path('/grupo'); 
    };
  $scope.OnChangeProyecto = function(proyecto)
  {

      var parametros = {
        Accion:'SELECTPRODUCTOPROYECTO',
        PRO_CODI:proyecto.pro_codi
      }

      var listProductos =TareasResource.prProyectoProducto(parametros);                      
        listProductos.then(function(r){
          $scope.listProductos =  r.data;
        })           
  }


  $scope.OnChangeInvestigador = function(inve)
  {
    var datos =inve;

    var parametros = {
      Accion:'SELECTPROYECTOINVESTIGADOR',
      idInve:inve.Id2
    }

    var listProyectos = TareasResource.execute.query(parametros);
      listProyectos.then(function(r){
        $scope.listProyectos =  r.data;
      })
    
  }


  $scope.actualizarTablas = function(idGrupo)
  {
    var executeSql;
    var result;
    var multiple=[];

    var parametros = {
        Accion:'DELETEGLIGRUPOCODI',
        idGrupo:idGrupo
    }

    executeSql = TareasResource.prGrupo(parametros);
       executeSql.then(function (result){



        if (result.data.length==0)
        {

           

            angular.forEach($scope.LineasInvestigacion, function(value, key){                    

                var fecha = '';
                
                  
                  if (value.FechaTermina!=null && value.FechaTermina!="")
                  {
                    fecha =value.FechaTermina;
                    
                     multiple.splice(0,0,
                      {
                        SQL:"INSERT INTO sgi_grup_line_inve (gli_grup_codi,gli_fech_inic,gli_line_inve_codi,gli_fech_term) " +
                        " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.Id2 + ",'" + value.FechaTermina + "')",
                        Accion:"I"
                      }); 


                    // executeSql = TareasResource.execute.query({Accion:'M',                 
                    // SQL:"UPDATE sgi_grup_line_inve set gli_fech_term ='" + value.FechaTermina + "' WHERE gli_codi=" + value.Id + ""});
                                                 
                   }
                   else

                     multiple.splice(0,0,
                      {
                        SQL:"INSERT INTO sgi_grup_line_inve (gli_grup_codi,gli_fech_inic,gli_line_inve_codi) " +
                        " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.Id2 + ")",
                        Accion:"I"
                      }); 


                    //  executeSql = TareasResource.execute.query({Accion:'I',                 
                    // SQL:idGrupo+";INSERT INTO sgi_grup_line_inve (gli_grup_codi,gli_fech_inic,gli_line_inve_codi) " +
                    // " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.Id2 + ")"});
                 });

                TareasResource.SQLMulti(multiple).then(function(result) { 

                   var user = JSON.parse($window.sessionStorage.getItem('investigador'));

                   executeSql = TareasResource.execute.query({Accion:'D',
                   SQL:"DELETE FROM sgi_inve_grup WHERE igr_grup_codi=" + idGrupo + " AND " +
                   " IGR_INVE_IDEN<>" + user.INV_CODI});
                   executeSql.$promise.then(function (result){
                  if (result[0].estado=="ok")
                      {
                        multiple=[];
                         angular.forEach($scope.Investigadores, function(value, key){                                                                          
                            if (value.FechaTermina!=null && value.FechaTermina!="")
                            {
                               if(value.Id2 != user.INV_CODI)
                                  {

                                     multiple.splice(0,0,
                                     {
                                      SQL:"INSERT INTO sgi_inve_grup (igr_grup_codi,igr_fech_inic,igr_tipo_vinc_codi,igr_inve_iden,igr_regi_ingr,igr_fech_term) " +
                                      " VALUES (" + idGrupo +",'" + value.FechaInicia + "'," + value.IdVincula + "," + value.Id2 + ",1,'" + value.FechaTermina + "')",
                                      Accion:"I"
                                     });    
                                 }
                                                           
                             }
                             else
                                if(value.Id2 != user.INV_CODI)
                                  {

                                     multiple.splice(0,0,
                                     {
                                      SQL:"INSERT INTO sgi_inve_grup (igr_grup_codi,igr_fech_inic,igr_tipo_vinc_codi,igr_inve_iden,igr_regi_ingr) " +
                                      " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.IdVincula + "," + value.Id2 + ",1)",
                                      Accion:"I"
                                     });                                     
                                 }
                            });
                             TareasResource.SQLMulti(multiple).then(function(result) { 


                                   executeSql = TareasResource.execute.query({Accion:'D',
                                    SQL:"DELETE FROM sgi_grup_semi WHERE sgr_grup_codi=" + idGrupo });

                                     executeSql.$promise.then(function (result) {
                                     if (result[0].estado=="ok")
                                     {
                                       multiple=[];
                                        angular.forEach($scope.Semilleros, function(value, key){                                                                          
                                       if (value.FechaTermina!=null && value.FechaTermina!="")
                                        { 

                                           multiple.splice(0,0,
                                           {
                                            SQL:"INSERT INTO sgi_grup_semi (sgr_grup_codi,sgr_fech_inic,sgr_semi_codi,sgr_fech_term) " +
                                            " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.Id2 + ",'"+ value.FechaTermina +"')",
                                            Accion:"I"
                                           });     
                                                                                
                                                                       
                                         }
                                         else
                                          multiple.splice(0,0,
                                           {
                                            SQL:"INSERT INTO sgi_grup_semi (sgr_grup_codi,sgr_fech_inic,sgr_semi_codi) " +
                                            " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.Id2 + ")",
                                            Accion:"I"
                                           });     
                                         });  
                                        TareasResource.SQLMulti(multiple).then(function(result) { 

                                              var  Investigadores = TareasResource.execute.query({Accion: 'S',
                                               SQL: "SELECT IG.igr_codi AS Id,I.inv_codi AS Id2, CONCAT(I.inv_apel,'',I.inv_nomb) AS Nombre," +
                                               " IG.igr_fech_inic AS FechaInicia,IG.igr_fech_term AS FechaTermina,IG.igr_tipo_vinc_codi AS IdVincula, " + 
                                               " 2 AS Tipo FROM " + 
                                               " sgi_grup As G INNER JOIN sgi_inve_grup AS IG ON " +
                                               " G.gru_codi = IG.igr_grup_codi INNER JOIN sgi_inve AS I ON " +
                                               " I.inv_codi = IG.igr_inve_iden " + 
                                               " WHERE IG.igr_grup_codi = " +  idGrupo + " AND IG.igr_fech_term is null "});   
                                              var tieneDatos1=false;

                                                 $scope.Investigadores  =[];   
                                                  Investigadores.$promise.then(function(result1){
                                                      angular.forEach(result1, function(value, key){
                                                        if (value.Nombre==undefined ||value.Nombre=="")                                
                                                        {
                                                          $scope.Investigadores  =[];                                
                                                        }
                                                        else
                                                        {
                                                          idInve =idInve + value.Id2  + ',';
                                                          tieneDatos1 =true;
                                                        }
                                                                    
                                                      });
                                                      if (tieneDatos1==true)
                                                      {
                                                           $scope.Investigadores = result1;  
                                                           idInve = idInve.substring(0,idInve.length-1); 
                                                           if (idInve!="")
                                                           {
                                                             $scope.listProyectos =  TareasResource.execute.query({Accion: 'S',
                                                                  SQL: "SELECT P.pro_nomb,P.pro_codi FROM sgi_proy As P INNER JOIN sgi_proy_inve AS PI ON P.pro_codi = PI.id_proy WHERE " +
                                                                  " PI.id_inve IN (" + idInve + ") "});

                                                              $scope.listProyectos.$promise.then(function(result){
                                                                   $scope.listProyectos = [];
                                                                var ProyectoProducto =  TareasResource.execute.query({Accion:'D',
                                                                    SQL:"DELETE FROM sgi_grup_proy WHERE id_inve=" +  user.INV_CODI + " AND " +
                                                                    " id_grup="+ IdGrupo + ""});

                                                                ProyectoProducto.$promise.then(function(result){

                                                                       if (result[0].estado=="ok")
                                                                        {
                                                                             multiple=[];
                                                                            angular.forEach($scope.Proyectos, function(value, key){                                                                          
                                                                                  if (value.fech_term!=null)
                                                                                  {                              
                                                                                    
                                                                                      multiple.splice(0,0,
                                                                                       {
                                                                                        SQL:"INSERT INTO sgi_grup_proy (id_proy,id_prod,id_grup,id_inve,fech_ini,fech_term) " +
                                                                                        " VALUES (" + value.IdProy +"," + value.IdProd +"," + IdGrupo +"," +  user.INV_CODI + ",'" + moment(value.fech_ini).format("YYYY-MM-DD") + "','"+ moment(value.fech_term).format("YYYY-MM-DD") + "')",
                                                                                        Accion:"I"
                                                                                       });                                                                                         
                                                                                                                 
                                                                                   }
                                                                                   else                              
                                                                                      multiple.splice(0,0,
                                                                                       {
                                                                                        SQL:"INSERT INTO sgi_grup_proy (id_proy,id_prod,id_grup,id_inve,fech_ini) " +
                                                                                        " VALUES (" + value.IdProy +"," + value.IdProd +"," + IdGrupo +"," +  user.INV_CODI + ",'"+ moment(value.fech_ini).format("YYYY-MM-DD") + "')",
                                                                                        Accion:"I"
                                                                                       });                                                                                              
                                                                                      
                                                                                  });

                                                                               TareasResource.SQLMulti(multiple).then(function(result) { 

                                                                                   var plan =  TareasResource.execute.query({Accion:'D',
                                                                                    SQL:"DELETE FROM sgi_plnt_grup WHERE  " +
                                                                                    " pgr_grup_codi="+ IdGrupo + ""});

                                                                                  plan.$promise.then(function(result){
                                                                                      

                                                                                      multiple=[];
                                                                                    angular.forEach($scope.planTrabajo, function(value, key){  
                                                                                       if (value.FechaTermina!=null)
                                                                                        {

                                                                                             multiple.splice(0,0,
                                                                                               {
                                                                                                SQL:"INSERT INTO  sgi_plnt_grup (pgr_grup_codi,pgr_nombre,pgr_fech_inic,pgr_fech_term,pgr_path) " +
                                                                                                  " VALUES (" + idGrupo +",'" + value.Nombre +"','"+ moment(value.FechaInicio).format("YYYY-MM-DD") + "','"+ moment(value.FechaTermina).format("YYYY-MM-DD") + "','" + value.Path  + "')",
                                                                                                Accion:"I"
                                                                                               });           

                                                                                         
                                                                                        }

                                                                                        else
                                                                                            {


                                                                                                multiple.splice(0,0,
                                                                                               {
                                                                                                SQL:"INSERT INTO  sgi_plnt_grup (pgr_grup_codi,pgr_nombre,pgr_fech_inic,pgr_path) " +
                                                                                                " VALUES (" + idGrupo +",'" + value.Nombre +"','" + moment(value.FechaInicio).format("YYYY-MM-DD") + "','" + value.Path  + "')",
                                                                                                Accion:"I"
                                                                                               });       
                                                                                              
                                                                                           
                                                                                            }

                                                                                              // executeSql = TareasResource.execute.query({Accion:'I',                                               
                                                                                              // SQL:"1;INSERT INTO  sgi_plnt_grup (pgr_grup_codi,pgr_nombre,pgr_fech_inic,pgr_path) " +
                                                                                              // " VALUES (" + idGrupo +",'" + value.Nombre +"','"+ value.FechaInicio + "','" + value.Path  + "')"});                              

                                                                                    });

                                                                                       TareasResource.SQLMulti(multiple).then(function(result) { 
                                                                                             $('#myModal').hide();  
                                                                                            $window.alert('Guardado');
                                                                                              $location.path('/edit-grupo/'+ idGrupo);
                                                                                        });
                                                                                    
                                                                                  });                                                                                    

                                                                               });                                                                                                  
                                                                        }                                                                        

                                                                 });
                                                             });  
                                                           }     
                                                         }
                                                         else
                                                                        {
                                                                           $('#myModal').hide();  
                                                                           $window.alert('Guardado');
                                                                        }

                                                      });   


                                             
                                         });

                                      }                                       
                                       
                                    });
                               
                             });
                      }
                    });
                   
              });


        }
  });
}

  function formatoFecha(fecha) {
           var mes;   
         var Meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                ];

         var dat = fecha.split("-");

        if (dat[1]==Meses[0]) mes =1;
        if (dat[1]==Meses[1]) mes =2;
        if (dat[1]==Meses[2]) mes =3;
        if (dat[1]==Meses[3]) mes =4;
        if (dat[1]==Meses[4]) mes =5;
        if (dat[1]==Meses[5]) mes =6;
        if (dat[1]==Meses[6]) mes =7;
        if (dat[1]==Meses[7]) mes =8;
        if (dat[1]==Meses[8]) mes =9;
        if (dat[1]==Meses[9]) mes =10;
        if (dat[1]==Meses[10]) mes =11;
        if (dat[1]==Meses[11]) mes =12;



            return dat[2] + "-" + mes + "-" + dat[0];

      }



  $scope.save = function(datos)
  {
    $scope.showAceptar = false;
    if ($scope.datos2[0].Grupo=="")
    {
      $window.alert("Falta Nombre del Grupo");
      return;
    }

    if ($('#FechaCreaGrupo').val()=="")
    {
      $window.alert("Falta seleccioanr fecha");
      return;
    }

    if ($scope.datos2[0].selArea=="")
    {
      $window.alert("Falta seleccionar Área");
      return;
    }

    if ($scope.datos2[0].selCentro=="")
    {
      $window.alert("Falta seleccionar Centro");
      return;
    }
    
   

    var fecha =moment($scope.datos2[0].Fecha).format("YYYY-MM-DD");

    var id = (datos.gru_codi) ? datos.gru_codi :'0' ;
    var mes =0;
    var agno =0;      
     $('#myModal').show();  

     var codigoColciencias=($scope.datos2[0].gru_colc_codi==undefined)? '': $scope.datos2[0].gru_colc_codi;
     var caterizacionColciencias =($scope.datos2[0].gru_cate_colc==undefined)? '':$scope.datos2[0].gru_cate_colc;
     if (id==0 || id==undefined)
     {

         
          var d =  $scope.datos;
         var Query= TareasResource.execute.query({Accion: 'I',
                         SQL: "1;INSERT INTO sgi_grup " + 
                         " (gru_nomb,gru_fech_ini,gru_area_codi,gru_cent_codi,gru_colc_codi,gru_cate_colc,gru_aval_inst) " +
                         " VALUES ('" + $scope.datos2[0].Grupo + "','" + fecha + "'," + $scope.datos2[0].selArea + "," + 
                          + $scope.datos2[0].selCentro + ",'" + codigoColciencias + "','" + caterizacionColciencias + "'," + $scope.datos2[0].gru_aval_inst + ")"});

          Query.$promise.then(function(result){

            Query = TareasResource.execute.query({Accion:'S',SQL:'SELECT Max(gru_codi) AS Maximo FROM sgi_grup'});
            Query.$promise.then(function(result){

              if (result[0].Maximo==null)
                 id=1;
               else
                 id = result[0].Maximo;
            IdGrupo=id;
           
               // Query = TareasResource.execute.query({Accion:'S',SQL:'SELECT igr_inve_iden  FROM sgi_inve_grup' + 
               //   " WHERE igr_inve_iden=" + user[0].Id_inve + " AND igr_grup_codi =" + id });
               //  Query.$promise.then(function(result){

                        Query= TareasResource.execute.query({Accion: 'I', 
                         SQL: id + "1;INSERT INTO sgi_inve_grup " + 
                         " (igr_inve_iden,igr_grup_codi,igr_fech_inic,igr_tipo_vinc_codi) " +
                         " VALUES ("+  user.INV_CODI + "," + id + ",'" + fecha + "',1)"});              

              Query.$promise.then(function(result){

                $scope.actualizarTablas(id);  

              });                        
                          
            });
          });

     }
     else
     {
       var Query= TareasResource.execute.query({Accion: 'M',
                         SQL: "UPDATE sgi_grup " + 
                         " set gru_nomb='" + $scope.datos2[0].Grupo + "',gru_fech_ini='" + fecha + "' ,gru_area_codi=" + $scope.datos2[0].selArea + ", " + 
                         " gru_cent_codi=" + $scope.datos2[0].selCentro + ",gru_colc_codi='" + codigoColciencias + "',gru_aval_inst=" + $scope.datos2[0].gru_aval_inst + "," + 
                         " gru_cate_colc='"+ caterizacionColciencias + "' WHERE gru_codi =" + id + " "});
           Query.$promise.then(function(result){

            if (result[0].estado=="ok")
            {
                  $scope.actualizarTablas(id);        
            }
            else 
              $window.alert(result[0].msg);
          });

      
     }
  }

  $scope.OnclickJdFechaInicia = function()
  {
    if ($('#jdFechaInicia').val()!="")
    {
      $('#jdFechaInicia').popover('destroy');
    }
  }

 $scope.OnclickJdFechaTermina = function()
 {
    if ($('#jdFechaTermina').val()!="")
    {
      $('#jdFechaTermina').popover('destroy');
    }
 }
  
  $scope.OnChangedCmdTipoGrupo = function()
  {
    $('#cmdTipoGrupo').popover('destroy');
  }
});  	