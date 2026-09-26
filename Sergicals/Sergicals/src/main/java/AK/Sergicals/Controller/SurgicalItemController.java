package AK.Sergicals.Controller;

import AK.Sergicals.Entity.SurgicalItem;
import AK.Sergicals.Service.SurgicalItemService;
import jakarta.persistence.Id;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/surgical-items")
public class SurgicalItemController {

    private final SurgicalItemService surgicalItemService;

    public SurgicalItemController(SurgicalItemService surgicalItemService) {
        this.surgicalItemService = surgicalItemService;
    }

    @PostMapping
    public SurgicalItem addSurgicalItem(@RequestBody SurgicalItem surgicalItem) {
        return surgicalItemService.addSurgicalItem(surgicalItem);
    }
    @GetMapping
    public List<SurgicalItem> getAllSurgicalItems() {
        return surgicalItemService.getAllSurgicalItems();
    }
    @GetMapping("/{id}")
    public SurgicalItem getSurgicalItemById(@PathVariable Integer id) {
        return surgicalItemService.getSurgicalItemById(id);
    }
    @PutMapping("/{id}")
    public SurgicalItem updateSurgicalItem(@PathVariable Integer id,
                                           @RequestBody SurgicalItem surgicalItem) {
        return surgicalItemService.updateSurgicalItem(id, surgicalItem);
    }
    @DeleteMapping("/{id}")
    public String deleteSurgicalItem(@PathVariable Integer id)
    {
        return surgicalItemService.deleteSurgicalItem(id);
    }
}