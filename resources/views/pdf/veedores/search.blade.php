<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <!-- Styles -->
    <link href="{{ public_path('/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">

</head>

<body>
    <center>
        <strong style="font-size:20px">Reporte de Veedores</strong>
    </center>
    <br>

    <div class="header-horizontal">
        <div class="container-fluid" style="background-color: #ffd700">
            <a class="d-flex flex-row-reverse" href="#"></a>
            <img src="{{ public_path('/assets/logos/favicon.png') }}" alt="logo" width="65px" height="50px">
        </div>
    </div>

    <div class="container-fluid">

        <table border="1" width="100" style="width:100%;border-collapse: collapse">
            <thead>
                <tr>
                    <th style="padding-right:10px; padding-left:10px">Cédula <br>(10 Dígitos)</th>
                    <th style="padding-right:10px; padding-left:10px">Apellidos y Nombres</th>
                    <th style="padding-right:10px; padding-left:10px">Cantón</th>
                    <th style="padding-right:10px; padding-left:10px">Lugar de Votación</th>
                    <th style="padding-right:10px; padding-left:10px">Recinto Electoral <br>Donde va a cuidar el voto</th>
                    <th style="padding-right:10px; padding-left:10px">Celular</th>
                    <th style="padding-right:10px; padding-left:10px">Supervisor</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($veedores as $value)
                    <tr>
                        <td style="padding-right:10px; padding-left:10px">{{ $value->dni }}</td>
                        <td style="padding-right:10px; padding-left:10px">{{ $value->nombres }}</td>
                        <td style="padding-right:10px; padding-left:10px">{{ Str::title(Str::of($value->canton)->lower()) }}</td>
                        <td style="padding-right:10px; padding-left:10px">{{ Str::title(Str::of($value->origen)->lower()) }}</td>
                        <td style="padding-right:10px; padding-left:10px">{{ Str::title(Str::of($value->destino)->lower()) }}</td>
                        <td style="padding-right:10px; padding-left:10px">{{ $value->phone }}</td>
                        <td style="padding-right:10px; padding-left:10px">{{ $value->supervisor }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
