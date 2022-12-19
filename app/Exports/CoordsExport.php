<?php

namespace App\Exports;

use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;



class CoordsExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles, WithColumnFormatting
{
    protected $canton_id, $parroquia_id, $recinto_id;

    public function __construct(int $canton_id, int $parroquia_id, int $recinto_id) {
        $this->canton_id = $canton_id;
        $this->parroquia_id = $parroquia_id;
        $this->recinto_id = $recinto_id;

    }

    public function columnWidths(): array
    {
        return [
            'A' => 22,
            'B' => 30,
            'C' => 27,
            'D' => 50,
            'E' => 50,
            'F' => 50,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
        $sheet->getStyle('C1')->getFont()->setBold(true);
        $sheet->getStyle('D1')->getFont()->setBold(true);
        $sheet->getStyle('E1')->getFont()->setBold(true);
        $sheet->getStyle('F1')->getFont()->setBold(true);
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_TEXT,
            'C' => NumberFormat::FORMAT_TEXT,


        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function headings(): array
    {
        return [
            'Cédula',
            'Apellidos y Nombres',
            'Telefono',
            'Cantón',
            'Parroquia',
            'Recinto',
        ];
    }

    public function collection()
    {

        $coordinadores = User::from('users as u')
            ->select(DB::raw('u.dni, CONCAT(u.first_name, " ", u.last_name) as nombres,
                                        u.phone, u.dni,
                                        c.nombre_canton, p.nombre_parroquia, re.nombre_recinto '))
            ->join('recinto_user as ru', 'ru.user_id', 'u.id')
            ->join('recintos as re', 're.id', 'ru.recinto_id')
            ->join('parroquias as p', 're.parroquia_id', 'p.id')
            ->join('cantones as c', 'p.canton_id', 'c.id')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->join('roles as r', 'r.id', 'mhr.role_id')
            ->where('r.id','3')
            ->canton($this->canton_id)
            ->parroquia($this->parroquia_id)
            ->recinto($this->recinto_id)
            ->get();

        return $coordinadores;
    }
}
