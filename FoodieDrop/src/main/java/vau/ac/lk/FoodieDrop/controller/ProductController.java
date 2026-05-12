package vau.ac.lk.FoodieDrop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vau.ac.lk.FoodieDrop.model.Product;
import vau.ac.lk.FoodieDrop.service.ProductService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product data) {
        Product savedProduct = productService.addProduct(data);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> products = productService.getProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/getProduct/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id) {
        String result = productService.deletById(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product data) {
        Product updatedProduct = productService.updateproduct(id, data);
        return ResponseEntity.ok(updatedProduct);
    }
}
