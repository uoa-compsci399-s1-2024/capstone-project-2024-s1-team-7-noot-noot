package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Uv;
import NootNoot.SightSaver.service.UVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/uv")
public class UVController {

    @Autowired
    private UVService uvService;

    @GetMapping
    public ResponseEntity<List<Uv>> getAll() {
        return new ResponseEntity<>(uvService.getAllUVValues(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Uv> getUVByID(@PathVariable Long id) {
        return new ResponseEntity<>(uvService.getUVValueById(id), HttpStatus.OK);
    }

    @GetMapping("/numberOfUVValues")
    public ResponseEntity<Long> getNumberOfUVValues() {
        return new ResponseEntity<>(uvService.getUVValueCount(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Uv> addUv(@RequestBody Uv uv) {
        return new ResponseEntity<>(uvService.saveUV(uv), HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public HttpStatus deleteUv(@PathVariable Long id) {

        uvService.deleteUV(id);
        return HttpStatus.NO_CONTENT;
    }
}