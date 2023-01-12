package calculators.project.spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import calculators.project.spring.mapper.BBSFormulasMapper;

@Service
public class BBSFormulasService {
	@Autowired
	private BBSFormulasMapper mapper;
}
