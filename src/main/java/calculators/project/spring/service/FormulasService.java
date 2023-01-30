package calculators.project.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import calculators.project.spring.mapper.FormulasMapper;
import calculators.project.spring.model.Formula;

@Service
public class FormulasService {
	@Autowired
	private FormulasMapper mapper;

	/** IDから計算表データを１件取得 */
	public Formula getFormulaOne(int creatorId, int formulaId) {
		return mapper.getFormulaOne(creatorId, formulaId);
	}
	/** IDから計算表リストを取得 */
	public List<Formula> getFormulaList(int creatorId){
		return mapper.getFormulaList(creatorId);
	}
	/** 計算表IDからjsonデータを取得 */
	public String getJsonOne(int creatorId, int formulaId) {
		return mapper.getJsonOne(creatorId, formulaId);
	}
	/** 計算表を１件追加 */
	public boolean addFormulaOne(Formula formula) {
		return mapper.addFormulaOne(formula);
	}
	/** 計算表を１件更新 */
	public boolean updateFormulaOne(Formula formula) {
		return mapper.updateFormulaOne(formula);
	}
	/** 計算表を１件削除 */
	public boolean deleteFormulaOne(int creatorId, int formulaId) {
		return mapper.deleteFormulaOne(creatorId, formulaId);
	}
}
