<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];  

  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="SELECT")
   {
    $SQL="SELECT USE_CODI,USE_IDEN,USE_TELE,USE_COD_TIPO, USE_NOMB,USE_APEL,USE_EMAI,USE_USUA, CASE WHEN USE_COD_TIPO=0 THEN 'Administrador'" .
    " ELSE 'Investigador' END AS TIPO from sgi_user WHERE USE_CODI";

    $resultArray = array(); 
  	$resultado = mysqli_query($conexion,$SQL);
    if (mysqli_num_rows($resultado)==0 )                        
        $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
    else
    {
     while ($tuple= mysqli_fetch_assoc($resultado)) {                        
           $resultArray[] = $tuple;         
        }               
    }
   }

    if ($Accion=="ValidarIdentificacion")
    {
     $SQL="SELECT COUNT(*) As Cuantos FROM sgi_user WHERE USE_IDEN = '" . $d['IdUser'] . "'";
 
     $resultArray = array(); 
      $resultado = mysqli_query($conexion,$SQL);
     if (mysqli_num_rows($resultado)==0 )                        
         $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
     else
     {
      while ($tuple= mysqli_fetch_assoc($resultado)) {                        
            $resultArray[] = $tuple;         
         }               
     }
   }

     if ($Accion=="ValidarUsuario")
     {
         $SQL="SELECT COUNT(*) As Cuantos FROM sgi_user WHERE USE_USUA= '" . $d['IdUsua'] . "'";
   
         $resultArray = array(); 
         $resultado = mysqli_query($conexion,$SQL);
         if (mysqli_num_rows($resultado)==0 )                        
            $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
         else
         {
         while ($tuple= mysqli_fetch_assoc($resultado)) {                        
               $resultArray[] = $tuple;         
            }               
         }
       }
    
       if ($Accion=="INSERT")
       {
         // $SQL="INSERT INTO sgi_user (USE_IDEN,USE_NOMB,USE_APEL,USE_EMAI,USE_TELE,USE_USUA,USE_CLAV,USE_COD_TIPO) " .
         // " VALUES ('" .  $d['USE_IDEN'] . "','" .  $d['USE_NOMB'] . "','" . $d['USE_APEL'] . "')" ;

         

         $SQL="SELECT MAX(USE_CODI) As Maximo FROM sgi_user";
         $resultado = mysqli_query($conexion,$SQL);
         if (mysqli_num_rows($resultado)==0 )                        
            $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
         else
         {
         while ($tuple= mysqli_fetch_assoc($resultado)) {                        
               $resultArray[] = $tuple;         
            }               
         }
         
         $USE_CODI =$resultArray[0]['Maximo'] + 1;

           $SQL="INSERT INTO sgi_user (USE_CODI,USE_IDEN,USE_NOMB,USE_APEL,USE_EMAI,USE_TELE,USE_USUA,USE_CLAV,USE_COD_TIPO) " .
           " VALUES (" . $USE_CODI . ",'" .  $d['USE_IDEN'] . "','" .  $d['USE_NOMB'] . "','" . $d['USE_APEL'] . "','"  . 
           $d['USE_EMAI'] . "','" . $d['USE_TELE'] . "','" . $d['USE_USUA'] . "','" .  $d['USE_PASS'] . "'," . $d['USE_COD_TIPO'] . ")";
         
           $resultArray[0]['Maximo'] = $USE_CODI; 
        
           $resultado = mysqli_query($conexion,$SQL);
           
         
         }
     


    echo json_encode($resultArray);      
    mysqli_close($conexion);                                                   
   
   
?>