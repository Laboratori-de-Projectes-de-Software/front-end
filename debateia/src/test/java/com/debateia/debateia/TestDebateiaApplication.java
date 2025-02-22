package com.debateia.debateia;

import org.springframework.boot.SpringApplication;

public class TestDebateiaApplication {

	public static void main(String[] args) {
		SpringApplication.from(DebateiaApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
