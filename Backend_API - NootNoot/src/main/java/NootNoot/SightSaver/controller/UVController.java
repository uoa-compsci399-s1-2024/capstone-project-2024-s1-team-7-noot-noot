package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Uv;
import NootNoot.SightSaver.service.UVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/UV")
public class UVController {

    @Autowired
    private UVService uvService;

    @GetMapping
    public List<Uv> getAll() {
        return uvService.getAllUVValues();
    }

    @GetMapping("/{id}")
    public Uv getUVByID(@PathVariable Long id) {
        return uvService.getUVValueById(id);
    }

    @GetMapping("/numberOfUVValues")
    public Long getNumberOfUVValues() {
        return uvService.getUVValueCount();
    }

    @PostMapping
    public Uv addUv(@RequestBody Uv uv) {
        return uvService.saveUV(uv);
    }


    @DeleteMapping("/{id}")
    public void deleteUv(@PathVariable Long id) {
        uvService.deleteUV(id);
    }
}