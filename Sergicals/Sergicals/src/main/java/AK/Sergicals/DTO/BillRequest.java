package AK.Sergicals.DTO;

import java.util.List;

public class BillRequest {

    private List<BillItemRequest> items;

    public List<BillItemRequest> getItems() {
        return items;
    }

    public void setItems(List<BillItemRequest> items) {
        this.items = items;
    }
}