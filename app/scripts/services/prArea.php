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
    $SQL="SELECT ARE_CODI,ARE_NOMB from sgi_area";

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
   mysqli_close($conexion);
   echo json_encode($resultArray);                                                        
   
?>