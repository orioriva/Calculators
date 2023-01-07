package calculators.project.spring.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.Formula;

@Mapper
public interface FormulasMapper {
	public Formula getFormulaOne(int creatorId, int formulaId);
	public List<Formula> getFormulaList(int creatorId);
	public String getJsonOne(int creatorId, int formulaId);
	public boolean addFormulaOne(Formula formula);
	public boolean updateFormulaOne(Formula formula);
	public boolean deleteFormulaOne(int creatorId, int formulaId);
}
