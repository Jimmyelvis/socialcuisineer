$(function(){
	  
    $('#jcrop_target').Jcrop({
      aspectRatio: 1,
	  setSelect:   [ 200,200,37,49 ],
      onSelect: updateCoords,
      allowMove: true,     // Allow moving the image
      allowResize: true,   // Allow resizing the selection
      allowSelect: true,   // Allow creating a new selection
      boxWidth: 500,       // Maximum width of the Jcrop container
      boxHeight: 400       // Maximum height of the Jcrop container
    });

  });

  function updateCoords(c)
  {
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
  };

  function checkCoords()
  {
    if (parseInt($('#w').val())) return true;
    alert('Please select a crop region then press submit.');
    return false;
  }; 
//End JCrop Bits

	function cancelCrop(){
		//Refresh page				
		top.location = 'upload.php';
		return false;
	}