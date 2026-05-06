package vau.ac.lk.FoodieDrop.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import vau.ac.lk.FoodieDrop.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
}
