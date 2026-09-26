package AK.Sergicals.Repository;

import AK.Sergicals.Entity.BillItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillItemRepository extends JpaRepository<BillItem, Long> {

    List<BillItem> findByBillId(Long billId);

}