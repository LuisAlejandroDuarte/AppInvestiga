<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];  

  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="SELECTBYIDINVE")
   {
    $SQL="SELECT G.gru_codi,G.gru_nomb FROM sgi_grup AS G INNER JOIN sgi_inve_grup AS IG ON IG.IGR_GRUP_CODI=G.gru_codi WHERE " .
    " IG.IGR_INVE_IDEN=" .  $d['IdInve'];

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
    mysqli_close($conexion);
    echo json_encode($resultArray);                                                        
   }

   if ($Accion=="SELECTGRUPO")
   {
    $SQL="SELECT grupo.gru_nomb As NombreGrupo,grupo.gru_codi As IdGrupo," .                           
    " inve_grup.igr_fech_inic As FechaInicio,inve_grup.igr_fech_term As FechaTermina,'false' As Sel FROM  sgi_inve_grup as inve_grup INNER JOIN " .
    " sgi_grup as grupo on grupo.gru_codi = inve_grup.igr_grup_codi " .
    " WHERE  inve_grup.igr_inve_iden=" .  $d['IdInve'];

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
  
    echo json_encode($resultArray);                                                        
    mysqli_close($conexion);
   }

?>