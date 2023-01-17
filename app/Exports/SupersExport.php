<?php

namespace App\Exports;

use App\Models\User;
use DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;



class SupersExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles, WithColumnFormatting
{
    protected $canton_id, $parroquia_id;

    public function __construct(int $canton_id, int $parroquia_id) {
        $this->canton_id = $canton_id;
        $this->parroquia_id = $parroquia_id;

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
        ];
    }

    public function collection()
    {

        $supervisores = User::from('users as u')
            ->select(DB::raw('u.dni, CONCAT(u.first_name, " ", u.last_name) as nombres,
                                        u.phone, c.nombre_canton,p.nombre_parroquia'))
            ->join('cantones as c', 'c.id', 'u.canton_id')
            ->join('parroquia_user as pu', 'pu.user_id', 'u.id')
            ->join('parroquias as p', 'p.id', 'pu.parroquia_id')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->join('roles as r', 'r.id', 'mhr.role_id')
            ->where('r.id','2')
            ->canton($this->canton_id)
            ->parroquia($this->parroquia_id)
            ->get();

        return $supervisores;
    }
}
