<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Coffe Time - Animation Time</title>
	<style media="screen">
        canvas {
            position: absolute;
            left: 0;
            top: 0;
            width:100%;
            height:100%;
        }

        .controls{
            position: absolute;
            left:50px;
            top:50px;
            z-index:1;
        }
    </style>
</head>
<body>
    <div class="controls">
        <form name="controls">
        </form>
    </div>
	<canvas class="canvas"></canvas>
    <script src="libs/jquery.js"></script>
    <script src="dev/app.js"></script>
</body>
</html>