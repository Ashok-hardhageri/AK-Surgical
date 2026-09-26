package AK.Sergicals.Service;

import AK.Sergicals.Entity.SurgicalItem;
import AK.Sergicals.Repository.SurgicalItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurgicalItemService {

    private final SurgicalItemRepository surgicalItemRepository;

    public SurgicalItemService(SurgicalItemRepository surgicalItemRepository) {
        this.surgicalItemRepository = surgicalItemRepository;
    }

    public SurgicalItem addSurgicalItem(SurgicalItem surgicalItem) {
        return surgicalItemRepository.save(surgicalItem);
    }
    public List<SurgicalItem> getAllSurgicalItems() {
        return surgicalItemRepository.findAll();
    }
    public SurgicalItem getSurgicalItemById(Integer id) {
        return surgicalItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Surgical item not found"));
    }
    public SurgicalItem updateSurgicalItem(Integer id, SurgicalItem surgicalItem) {

        SurgicalItem existingItem = surgicalItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Surgical item not found"));

        existingItem.setItemCode(surgicalItem.getItemCode());
        existingItem.setName(surgicalItem.getName());
        existingItem.setPrice(surgicalItem.getPrice());

        return surgicalItemRepository.save(existingItem);
    }
    public String deleteSurgicalItem(Integer id)
    {
        surgicalItemRepository.deleteById(id);
        return "Surgical item with ID " + id + " successfully deleted";
    }
}