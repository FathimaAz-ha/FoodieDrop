package vau.ac.lk.FoodieDrop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vau.ac.lk.FoodieDrop.model.Product;
import vau.ac.lk.FoodieDrop.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public String addProduct(Product data) {
        if(data.getName() != null && data.getCategory() != null && data.getPrice() != null && data.getStock() >= 0 && data.getDescription() != null){
            productRepository.save(data);
            return "Successfully added product!";
        }
        return "Product doesn't added!";
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public String deletById(String id) {
        productRepository.deleteById(id);
        return "Product deleted successfully!";
    }

    public void updateproduct(String id, Product data) {
        productRepository.findById(id).ifPresent(p -> {
            if(p.getName() != null){
                p.setName(data.getName());
            }

            if(p.getDescription() != null){
                p.setDescription(data.getDescription());
            }

            if(p.getStock() != null && p.getStock() >= 0){
                p.setStock(data.getStock());
            }

            if(p.getPrice() != null && p.getPrice() >= 0){
                p.setPrice(data.getPrice());
            }

            if(p.getCategory() != null){
                p.setCategory(data.getCategory());
            }

            if(p.getImage() != null){
                p.setImage(data.getImage());
            }

            productRepository.save(p);
        });
    }
}
