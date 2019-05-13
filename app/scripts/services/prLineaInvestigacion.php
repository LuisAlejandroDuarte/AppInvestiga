<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];  
  $resultArray = array(); 
  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="SELECT")
   {
    $SQL="SELECT l.lin_codi,l.lin_desc FROM sgi_grup_line_inve AS g " .
    " INNER JOIN sgi_line_inve AS l ON g.gli_line_inve_codi=l.lin_codi " .
    " WHERE g.gli_grup_codi=" . $d['IdGrupo'];

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

   if ($Accion=="SELECTLINEASINVESTIGACION")
   {
    $SQL="SELECT lin_codi,lin_desc FROM sgi_line_inve";

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

   if ($Accion=="SELECTLINEASBYGRUPO")
   {
    $SQL="SELECT GL.gli_codi As Id,LI.lin_codi As Id2, LI.lin_desc As Nombre,GL.gli_fech_inic AS FechaInicia, " .
    " GL.gli_fech_term As FechaTermina, 1 AS tipo FROM " .
    " sgi_grup As G INNER JOIN sgi_grup_line_inve AS GL ON " .
    " G.gru_codi = GL.gli_grup_codi INNER JOIN sgi_line_inve AS LI ON " .
    " LI.lin_codi = GL.gli_line_inve_codi " . 
    " WHERE G.gru_codi = " .  $d['IdGrupo'];

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
   
   if ($Accion=="SELECTLINEASBYGRUPO2")
   {
    $SQL="SELECT l.lin_codi,l.lin_desc FROM sgi_grup_line_inve AS g " .
    " INNER JOIN sgi_line_inve AS l ON g.gli_line_inve_codi=l.lin_codi " .
    " WHERE g.gli_grup_codi=" . $d['gru_codi'];
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

   if ($Accion=="SELECTLINEASBYGRUPO3")
   {
    $SQL="SELECT l.lin_codi,l.lin_desc FROM sgi_grup_line_inve AS g " .
    " INNER JOIN sgi_line_inve AS l ON g.gli_line_inve_codi=l.lin_codi " .
    " WHERE g.gli_grup_codi=" .  $d['idGrupo'] ; 
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


    echo json_encode($resultArray);                                                        
    mysqli_close($conexion);
   
?>