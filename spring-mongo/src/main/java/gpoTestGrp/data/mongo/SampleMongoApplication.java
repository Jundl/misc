/**
 * archetype: org.springframework.boot:spring-boot-sample-data-mongodb-archetype
 *
 * funktioniert direkt mit laufender DB
 * 
 * IMplementierung MONGODB-Zugriff:
 * -  Spring:
 * 		- org.springframework.data.mongodb.core.MongoTemplate verwendet:
 * -  Mongo API Client Lib:
 * 		- com.mongodb.DB
 * 		- com.mongodb.DBCursor
 * 		- com.mongodb.Mongo (hier wird connection erzeugt)
 * 
 * die spring-mongo-Layer ist insbesondere in den Klassen
 * 		- com.mongodb; 
 */

package gpoTestGrp.data.mongo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@ComponentScan
public class SampleMongoApplication implements CommandLineRunner {

	@Autowired
	private CustomerRepository repository;

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		// save a couple of customers
		repository.save(new Customer("Alice", "Smith"));
		repository.save(new Customer("Bob", "Smith"));

		// fetch all customers
		System.out.println("Customers found with findAll():");
		System.out.println("-------------------------------");
		for (Customer customer : repository.findAll()) {
			System.out.println(customer);
		}
		System.out.println();

		// fetch an individual customer
		System.out.println("Customer found with findByFirstName('Alice'):");
		System.out.println("--------------------------------");
		System.out.println(repository.findByFirstName("Alice"));

		System.out.println("Customers found with findByLastName('Smith'):");
		System.out.println("--------------------------------");
		for (Customer customer : repository.findByLastName("Smith")) {
			System.out.println(customer);
		}

	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SampleMongoApplication.class, args);
	}
}
