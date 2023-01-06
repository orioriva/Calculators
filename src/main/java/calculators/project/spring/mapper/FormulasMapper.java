package calculators.project.spring.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.Formula;

@Mapper
public interface FormulasMapper {
	public List<Formula> getFormulaList(int creatorId);
	public boolean addFormulaOne(Formula formula);
	public boolean updateFormulaOne(Formula formula);
	public boolean deleteFormulaOne(int id);
}
