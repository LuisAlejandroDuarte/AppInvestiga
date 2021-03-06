'use strict';

 angular.module('listaTareasApp')

.directive('myModalgrupo', function() {
  return {
    restrict : 'AE',    
      controller: [ "$scope","$window",'$http','TareasResource', function($scope,$window,$http,TareasResource) {
        $scope.afirmaEliminar = function() {
          var Codigo = $('#myModal').data('id').toString(); 
            var user = JSON.parse($window.sessionStorage.getItem('investigador'));
              var Execute = {
                Accion:'SELECTCOUNTGRUPOINVE',
                coidgo: Codigo,
                INV_CODI: user.INV_CODI
                }
                var result= TareasResource.prGrupo(Execute)
                  .then(function(result2){
                   if (result2.data[0].Count>0)
                   {
                    $window.alert("Debe primero eliminar los investigadores relacionados al grupo");
                    $('#myModal').data('id', 0).modal('hide'); 
                    return;
                    }
                    else
                    {
                      Execute = {
                      Accion:'SELECTCOUNTGRUPOLINEA',
                      Coidgo: Codigo
                      }
                      result= TareasResource.prGrupo(Execute)
                        .then(function(result2){
                          if (result2.data[0].Count>0)
                          {
                           $window.alert("Debe primero eliminar las líneas de investigación relacionados al grupo");
                           $('#myModal').data('id', 0).modal('hide'); 
                           return;
                          }
                          else
                          {
                            Execute = {
                            Accion:'SELECTCOUNTGRUPOSEMILLA',
                            Codigo:Codigo
                            }
                            result= TareasResource.prGrupo(Execute)
                            .then(function(result2){
                            if (result2.data[0].Count>0)
                            {
                              $window.alert("Debe primero eliminar los semilleros relacionados al grupo");
                              $('#myModal').data('id', 0).modal('hide'); 
                              return;
                            }
                            else
                            {
                              Execute = {
                              Accion:'SELECTCOUNTGRUPOPROYECTO',
                              Coidgo: Codigo 
                              }
                              result= TareasResource.prGrupo(Execute)
                             .then(function(result2){
                              if (result2.data[0].Count>0)
                              {
                               $window.alert("Debe primero eliminar los productos  relacionados al grupo");
                               $('#myModal').data('id', 0).modal('hide'); 
                               return;
                               }
                               else
                               {
                                Execute = {
                                  Accion:'SELECTCOUNTPROGRUPO',
                                  Codigo:Codigo
                                 }
                                result= TareasResource.prGrupo(Execute)
                                .then(function(result2){
                                if (result2.data[0].Count>0)
                                {
                                 $window.alert("Debe primero eliminar los plan trabajo grupo relacionados al grupo");
                                 $('#myModal').data('id', 0).modal('hide'); 
                                 return;
                                }
                                else
                                {
                                 $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_grup" +
                                 " WHERE gru_codi = " + Codigo, $scope.formData)
                                 .success(function(data) {  
                                  var multiple =[];
                                  multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_inve_grup WHERE IGR_GRUP_CODI=' + Codigo });  
                                  multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_grup_line_inve WHERE gli_grup_codi=' + Codigo  }); 
                                  multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_grup_semi WHERE sgr_grup_codi=' + Codigo  }); 
                                  multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_plnt_grup WHERE pgr_grup_codi=' + Codigo  }); 
                                  multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_grup_proy WHERE id_grup=' + Codigo  }); 
                                  TareasResource.SQLMulti(multiple).then(function(result) {    
                                  $('#tablegrupo').bootstrapTable('remove', {
                                    field: 'gru_codi',
                                    values: Codigo
                                  });                                                                                                                                                                         
                                  $('#myModal').modal('hide');
                                    });
                                  })
                                  .error(function(data) {
                                    $('#myModal').modal('hide');
                                    alert(data['msg']);                        
                                  });  
                                }
                              });
                             }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              };               
            }],
        template : '<div class="modal fade" id="myModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + 
          '<div class="modal-dialog">' +
        '<div class="modal-content">' +
            '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                 '<h3 class="modal-title" id="myModalLabel">Advertencia!</h3> ' +
            '</div>' +
            '<div class="modal-body"> ' +
                 '<h4> Desea Borrar el grupo? </h4> ' +
                  '<div><label id="nombreGrupo"></label>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button ng-click= "afirmaEliminar();" class="btn btn-danger"  id="btnYes" >Si</button>' +
                '<button type="button" class="btn btn-default" data-dismiss="modal"  >No</button>' +
            '</div>' +        
        '</div>' +        
      '</div>' +    
    '</div>' +
  '</div>',  
    }

})

 .controller('ControladorGrupo', ['$scope','$window','$cookieStore','$location','TareasResource', function($scope,$window,$cookieStore,$location,TareasResource) {
    var user = JSON.parse($window.sessionStorage.getItem('investigador'));
    moment.locale('es');
      var admin = JSON.parse($window.sessionStorage.getItem('usuario'));
    $scope.btnNuevo=true;
    if (user==null || user==undefined)
    {   
       if (admin.Usuario!="admin")
       {

        $location.path('/menu');
         return;
      }
      else
      {
        $scope.btnNuevo=false;
      }
     
   }

  if (admin.Usuario=="admin")
  {
     $scope.btnNuevo=false;
  }



         $scope.options = {           

            method: 'post',
                  

                cache: false,

                height: 500,

                striped: true,

                pagination: true,                

                pageList: [10, 25, 50, 100, 200],

                search: true,
                showExport:true,
                showColumns: true,

                showRefresh: true,

                minimumCountColumns: 2,

                clickToSelect: true,

                idField:'gru_codi',

                toolbar: '#toolbargrupo',

            columns: [{               

                field: 'Grupo',

                title: 'GRUPO',

                align: 'left',

                valign: 'middle',

                sortable: true

            }, {

                field: 'Fecha',

                title: 'FECHA DE CREACIÓN',

                align: 'left',

                valign: 'middle',

                sortable: true,

                 formatter: function(value, row, index) {



                    return moment(value).format("DD MMMM YYYY");

                 }



            }, {

                field: 'Investigador',

                title: 'Director',

                align: 'left',

                valign: 'middle',

                sortable: true

            } , {

                field: 'gru_aval_inst',

                title: 'Avalado',

                align: 'left',

                valign: 'middle',

                sortable: true,

                 formatter: function(value, row, index) {



                    return (value==0)? 'NO':'SI';

                 }

            } ,{

                title: '',

                width: 75,

                switchable:false,

                formatter: function(value, row, index) {

                     var admin =JSON.parse($window.sessionStorage.getItem('usuario'));

                      if (admin.Usuario!="admin")
                      {

                        return '<a class="edit ml10 btn btn-default btn-xs" title="Editar"><span class="glyphicon glyphicon-pencil"></span></a>&nbsp; ' +

                        '<a class="remove ml10 btn btn-default btn-xs" title="Eliminar" ><span class="glyphicon glyphicon-trash"></span></a>';
                      }
                      else

                      {
                         return '<img src="images/pdf.png" alt="pdf" class="pdf" style="width:30px;height:30px;cursor:pointer">';
                      }



                },

                events:  $window.operateEvents = {

                        'click .remove': function (e, value, row, index) {

                                $('#nombreGrupo').text(row.Grupo);

                                  $('#myModal').data('id', row.gru_codi).modal('show');                                

                        },



                        'click .edit': function (e, value, row, index) {

                                 $window.location.href ="#/edit-grupo/" + row.gru_codi + "";                           

                        },


                        'click .pdf': function (e, value, row, index) {

                           var datos = {
                              Accion:'Grupo',
                              SQL:'select g.gru_codi,i.inv_nomb,i.inv_apel, g.gru_nomb,g.gru_fech_ini,g.gru_fech_term,g.gru_colc_codi,a1.are_nomb,c1.cen_nomb As centro1,c2.cen_nomb as centro2,z.zon_nomb,g.gru_aval_inst, ' + 
                                  ' p.pac_nomb,e.esc_nomb from sgi_grup  as g ' +
                                  ' inner join sgi_inve_grup As ig on ig.igr_grup_codi = g.gru_codi' +
                                  ' inner join  sgi_inve as i on i.inv_codi=ig.igr_inve_iden' +
                                  ' inner join  sgi_area as a1 on a1.are_codi=g.gru_area_codi' +
                                  ' inner join  sgi_cent as c1 on c1.cen_codi = g.gru_cent_codi ' +
                                  ' inner join  sgi_cent as c2 on c2.cen_codi = i.inv_cent_codi' +
                                  ' inner join  sgi_zona as z on z.zon_codi = c2.cen_zona_codi' +
                                  ' inner join  sgi_prog_acad as p on p.pac_codi = i.inv_prog_acad_codi ' +
                                  ' inner join  sgi_escu as e on e.esc_codi = p.pac_escu_codi' +
                                  ' where ig.igr_tipo_vinc_codi=1 AND g.gru_codi=' + row.gru_codi
                           }                           

                           var select= TareasResource.SQL(datos);
                              select.then(function(result){

                                 result.data[0].gru_fech_ini =(result.data[0].gru_fech_ini!=null)? moment(result.data[0].gru_fech_ini).format("DD MMMM YYYY") :"";    
                                 result.data[0].gru_fech_term =(result.data[0].gru_fech_term!=null && result.data[0].gru_fech_term!="0000-00-00")?  moment(result.data[0].gru_fech_term).format("DD MMMM YYYY"):"";    

                                 angular.forEach(result.data[4],function(row,value) {

                                  row.fech_ini =(row.fech_ini!=null)? moment(row.fech_ini).format("DD MMMM YYYY") :"";    
                                  row.fech_term =(row.fech_term!=null)? moment(row.fech_term).format("DD MMMM YYYY") :"";    

                                 });                              

                                var grupo = {
                                   datos:result.data[0],
                                   investigacion:result.data[1],
                                   integrante:result.data[2],
                                   semillero:result.data[3],
                                   produccion:result.data[4],
                                   plantrabajo:result.data[5]
                                } 



                                   select= TareasResource.PdfGrupo(JSON.stringify(grupo));
                                   select.then(function(r){

                                    var file = new Blob([r.data], { type: 'application/pdf;charset=utf-8' });
                                     saveAs(file, row.Grupo + '_grupo.pdf');   

                                   });

                              });
                        }

                }


            }]

        };

        var admin =JSON.parse($window.sessionStorage.getItem('usuario'));

        if (admin.Usuario!="admin")
        {
            var datos = {
            Accion:"S",
            SQL:"SELECT IG.igr_grup_codi,G.gru_nomb AS Grupo,G.gru_codi,G.gru_aval_inst," + 
            " G.gru_fech_ini AS Fecha,CONCAT(I.inv_nomb,' ' ,I.inv_apel) As Investigador " + 
            " FROM sgi_inve_grup AS IG  INNER JOIN sgi_grup AS G ON G.gru_codi = IG.igr_grup_codi " + 
            " INNER JOIN sgi_inve As I ON I.inv_codi = IG.igr_inve_iden WHERE IG.igr_tipo_vinc_codi=1 AND IG.igr_inve_iden=" + user.INV_CODI
           }
        }
        else

        {
           var datos = {
            Accion:"S",
            SQL:"SELECT IG.igr_grup_codi,G.gru_nomb AS Grupo,G.gru_codi,G.gru_aval_inst," + 
            " G.gru_fech_ini AS Fecha,CONCAT(I.inv_nomb,' ' ,I.inv_apel) As Investigador " + 
            " FROM sgi_inve_grup AS IG  INNER JOIN sgi_grup AS G ON G.gru_codi = IG.igr_grup_codi " + 
            " INNER JOIN sgi_inve As I ON I.inv_codi = IG.igr_inve_iden WHERE IG.igr_tipo_vinc_codi=1"
           }
        }

      

        var grupo =TareasResource.SQL(datos);
        grupo.then(function(result){

          if (result.data[0]!=null)

          $('#tablegrupo').bootstrapTable('load',result.data);
        });
        

    $scope.onClicSalir = function()
    {

          var admin =JSON.parse($window.sessionStorage.getItem('usuario'));

        if (admin.Usuario!="admin")
        {
           $window.sessionStorage.setItem('tipoUsuario',null);

        $window.sessionStorage.setItem('usuario',null);

       	$location.path('/menuGrupo');
        }
        else

        {
           $window.sessionStorage.setItem('tipoUsuario',null);      

           $window.location.href = "#/menuReporte/";
        }

       

    }



    }])







.directive('initTablagrupo', ['$compile', function($compile) {

        return {

            restrict: 'A',



            link: function(scope, el, attrs) {

                    var opts = scope.$eval(attrs.initTablagrupo);   

                    opts.onLoadSuccess = function() {

                        $compile(el.contents())(scope); 

            };

             el.bootstrapTable(opts);

              scope.$watch(el, function (bstable) {

                    $compile(el.contents())(scope);

                });    

                el.bind('body-changed.bs.table', function () {

                    var body = el.find('tbody')[0];

                    console.log('get here one more time');

                    $compile(body)(scope);

                });

            }

        }

    }])









.controller('ListControllerGrupo', ['$window','$scope', function($window,$scope) {

  

        this.btnNovoClick = function() {

            $window.location.href = "#/edit-grupo/0";

        };            

    }]);

