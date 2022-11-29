<?php

namespace App\Exports;

use App\Models\Veedor;
use DB;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;



class VeedoresExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles, WithColumnFormatting
{
    protected $canton_id, $parroquia_id, $recinto__id, $user_id;

    public function __construct(int $canton_id, int $parroquia_id, int $recinto__id, int $user_id) {
        $this->canton_id = $canton_id;
        $this->parroquia_id = $parroquia_id;
        $this->recinto__id = $recinto__id;
        $this->user_id = $user_id;

    }

    public function columnWidths(): array
    {
        return [
            'A' => 22,
            'B' => 30,
            'C' => 27,
            'D' => 50,
            'E' => 50,
            'F' => 20,
            'G' => 30
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
        $sheet->getStyle('G1')->getFont()->setBold(true);


    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_TEXT,
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
            'Cantón',
            'Lugar de Votación',
            'Recinto Electoral donde va a cuidar el voto',
            'Celular',
            'Supervisor'
        ];
    }

    public function collection()
    {

        $veedores = Veedor::from('veedores as v')
            ->select(DB::raw('CAST(v.dni AS NCHAR),
                        CONCAT(v.first_name, " ", v.last_name) as nombres,
                        c.nombre_canton as canton,
                        r.nombre_recinto as origen,
                        re.nombre_recinto as destino,
                        v.phone,
                        CONCAT(us.first_name, " ", us.last_name) as supervisor'))
            ->join('recintos as r', 'v.recinto_id', 'r.id')
            ->join('recintos as re', 're.id', 'v.recinto__id')
            ->join('parroquias as p', 'p.id', 're.parroquia_id')
            ->join('cantones as c', 'c.id', 'p.canton_id')
            ->join('users as u', 'u.id', 'v.user_id')
            ->join('users as us', 'us.id', 'u.user_id')
            ->canton($this->canton_id)
            ->parroquia($this->parroquia_id)
            ->recinto($this->recinto__id)
            ->usuario($this->user_id)
            ->orderBy('c.id', 'ASC')
            ->get();

        return $veedores;
    }
}
