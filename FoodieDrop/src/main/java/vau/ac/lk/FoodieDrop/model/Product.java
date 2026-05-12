package vau.ac.lk.FoodieDrop.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String category;
    private Double price;
    private Integer stock;
    private String description;
    private String image;


    public Product(){}

    public Product(String id, String name, String category, Double price, String description, Integer stock, String image){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.image = image;
    }

    public String getId(){ return id; }

    public String getName(){ return name; }

    public String getCategory(){ return category; }

    public Double getPrice(){return price; }

    public String getDescription(){ return description; }

    public Integer getStock(){ return stock; }

    public String getImage(){ return image; }


    public void setId(String id){ this.id = id; }

    public void setName(String name){ this.name = name; }

    public void setCategory(String category){ this.category = category; }

    public void setPrice(Double price){ this.price = price; }

    public void setDescription(String description){ this.description = description; }

    public void setStock(Integer stock){ this.stock = stock; }

    public void setImage(String image){ this.image = image; }
}
