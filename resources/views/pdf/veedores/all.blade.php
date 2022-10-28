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
        <strong style="font-size:20px">Reporte Total de Veedores</strong>
    </center>
    <br>

    <div class="header-horizontal">
        <div class="container-fluid" style="background-color: #ffd700">
            <a class="d-flex flex-row-reverse" href="#"></a>
            <img src="{{ public_path('/assets/media/logos/favicon.png') }}" alt="logo" width="65px" height="50px">
        </div>
    </div>

    <div class="container-fluid">

        <table border="1" width="100" style="width:100%;border-collapse: collapse">
            <thead>
                <tr>
                    <th style="text-align:center">Cédula <br>(10 Dígitos)</th>
                    <th style="text-align:center">Apellidos y Nombres Completos</th>
                    <th style="text-align:center">Cantón</th>
                    <th style="text-align:center">Lugar de Votación</th>
                    <th style="text-align:center">Recinto Electoral <br>Donde va a cuidar el voto</th>
                    <th style="text-align:center">Celular</th>
                    <th style="text-align:center">Correo</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($veedores as $value)
                    <tr>
                        <td align="center">{{ $value->dni }}</td>
                        <td align="center">{{ $value->nombres }}</td>
                        <td align="center">{{ Str::title(Str::of($value->canton)->lower()) }}</td>
                        <td align="center">{{ Str::title(Str::of($value->origen)->lower()) }}</td>
                        <td align="center">{{ Str::title(Str::of($value->destino)->lower()) }}</td>
                        <td align="center">{{ $value->phone }}</td>
                        <td align="center">{{ $value->email }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
