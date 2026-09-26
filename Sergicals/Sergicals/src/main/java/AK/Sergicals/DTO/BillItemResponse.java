package AK.Sergicals.DTO;

public class BillItemResponse {

    private Long itemId;
    private String itemName;
    private Long quantity;
    private double price;
    private double itemTotal;

    public BillItemResponse(Long itemId, String itemName,
                            Long quantity, double price,
                            double itemTotal) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.quantity = quantity;
        this.price = price;
        this.itemTotal = itemTotal;
    }

    public Long getItemId() {
        return itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public Long getQuantity() {
        return quantity;
    }

    public double getPrice() {
        return price;
    }

    public double getItemTotal() {
        return itemTotal;
    }
}