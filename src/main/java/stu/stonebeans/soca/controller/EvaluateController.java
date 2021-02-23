package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.EvaluateSBO;
import stu.stonebeans.soca.vo.SubjectVO;

import java.util.HashMap;

@RestController
public class EvaluateController {

    private EvaluateSBO evaluateSBO;

    @Autowired
    public EvaluateController(EvaluateSBO evaluateSBO) { this.evaluateSBO = evaluateSBO; }

    @RequestMapping(value = "/getSubjectData", method = RequestMethod.POST)
    public SubjectVO getSubjectData(@RequestBody HashMap<String,String> map) {
        return evaluateSBO.getSubjectData(map.get("subjectID"));
    }
}
