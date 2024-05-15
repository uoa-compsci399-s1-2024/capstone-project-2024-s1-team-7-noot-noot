package NootNoot.SightSaver.service;

import NootNoot.SightSaver.model.Sensor;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public class ExcelExportService {


    private UVService uvService;
    private LuxService luxService;

    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<Sensor> SensorList;

    public ExcelExportService(List<Sensor> SensorList, UVService uvService, LuxService luxService) {
        this.SensorList = SensorList;
        workbook = new XSSFWorkbook();
        this.uvService = uvService;
        this.luxService = luxService;


    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        }
        else if (value instanceof Double) {
            cell.setCellValue((Double) value);
        }
        else if (value instanceof String) {
            cell.setCellValue((String) value);
        }
        else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else if (value instanceof LocalDateTime) {
            cell.setCellValue((LocalDateTime) value);
        } else if (value instanceof Float) {
            cell.setCellValue((Float) value);

        } else{
            cell.setCellValue((Long) value);
        }
        cell.setCellStyle(style);
    }

    private void createHeaderRow() {
        sheet = workbook.createSheet("Sensor Information");
        Row headerRow = sheet.createRow(0);
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(20);
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER);
        createCell(headerRow, 0, "Sensor Information", style);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0 , 5));
        font.setFontHeightInPoints((short) 10);

        headerRow = sheet.createRow(1);
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        createCell(headerRow, 0, "Sensor ID", style);
        createCell(headerRow, 1, "User ID", style);
        createCell(headerRow, 2, "UV Value", style);
        createCell(headerRow, 3, "Lux Value", style);
        createCell(headerRow, 4, "DateTime", style);
    }
    private void writeSensorData() throws IOException {
        int rowCount = 2;
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);
        SensorService sensorService = new SensorService();

        for (Sensor sensor : SensorList) {
            if(uvService.findUVValueByID(sensor.getUvId()) != 0 && luxService.findLuxValueByID(sensor.getLuxId()) != 0) {
                Row row = sheet.createRow(rowCount++);
                int columnCount = 0;
                createCell(row, columnCount++, sensor.getId(), style);
                createCell(row, columnCount++, sensor.getUserId(), style);
                createCell(row, columnCount++, uvService.findUVValueByID(sensor.getUvId()), style);
                createCell(row, columnCount++, luxService.findLuxValueByID(sensor.getLuxId()), style);
                createCell(row, columnCount++, uvService.findUVValueDateByID(sensor.getUvId()), style);
            }
        }


    }

    public void exportExcel(HttpServletResponse response) throws IOException {
        createHeaderRow();
        writeSensorData();
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();

    }

}