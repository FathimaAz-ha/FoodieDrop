package vau.ac.lk.FoodieDrop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vau.ac.lk.FoodieDrop.model.Product;
import vau.ac.lk.FoodieDrop.service.ProductService;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500") // this is used when the frontend is running on the live server
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    // add product
    @PostMapping("/addProduct")
    public String addProduct(@RequestBody Product data){
        return productService.addProduct(data);
    }

    // get all products
    @GetMapping("/getAllProducts")
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    // delete product by id
    @DeleteMapping("/deleteById/{id}")
    public String deleteByid(@PathVariable String id){
        return productService.deletById(id);
    }

    // edit a product
    @PatchMapping("/updateProduct/{id}")
    public String updateProduct(@PathVariable String id, @RequestBody Product data){
        productService.updateproduct(id, data);
        return "Product updated!";
    }
}
