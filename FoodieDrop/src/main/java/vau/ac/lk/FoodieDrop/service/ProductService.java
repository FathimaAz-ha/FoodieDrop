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

    public Product addProduct(Product data) {
        if(data.getName() != null && data.getCategory() != null && data.getPrice() != null && data.getStock() >= 0 && data.getDescription() != null){
            return productRepository.save(data);
        }
        throw new IllegalArgumentException("Invalid product data");
    }

    public List<Product> getProducts() {
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            if (product.getImage() == null || product.getImage().isEmpty()) {
                // Set a default image URL
                product.setImage("https://via.placeholder.com/300x200?text=No+Image");
            }
        }
        return products;
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public String deletById(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return "Product deleted successfully!";
        }
        throw new RuntimeException("Product not found");
    }

    public Product updateproduct(String id, Product data) {
        return productRepository.findById(id).map(p -> {
            if(data.getName() != null){
                p.setName(data.getName());
            }

            if(data.getDescription() != null){
                p.setDescription(data.getDescription());
            }

            if(data.getStock() != null && data.getStock() >= 0){
                p.setStock(data.getStock());
            }

            if(data.getPrice() != null && data.getPrice() >= 0){
                p.setPrice(data.getPrice());
            }

            if(data.getCategory() != null){
                p.setCategory(data.getCategory());
            }

            if(data.getImage() != null){
                p.setImage(data.getImage());
            }

            return productRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
