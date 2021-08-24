package stu.stonebeans.soca.sbo.impl;

import com.sun.jdi.IntegerValue;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.DelegatingServerHttpResponse;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.config.PropertyUtil;
import stu.stonebeans.soca.sbo.EvaluateSBO;
import stu.stonebeans.soca.sbo.MailSBO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.*;
import stu.stonebeans.soca.dao.StudentDAO;
import stu.stonebeans.soca.dao.EvaluateDAO;

import javax.servlet.http.HttpSession;
import java.util.*;

@Service
@AllArgsConstructor
public class EvaluateSBOImpl implements EvaluateSBO {

    @Autowired
    private EvaluateDAO evaluateDAO;

    @Override
    public SubjectVO getSubjectData(String subjectID){
        return evaluateDAO.getSubjectData(subjectID);
    }

    @Override
    public List<SubjectVO> getAllMajors() { return evaluateDAO.getAllMajors(); }

    @Override
    public List<SubjectVO> findSubjects(int num) {
        if(num == 1) {
            return evaluateDAO.getSubjectsBySub();
        } else if(num == 2) {
            return evaluateDAO.getSubjectsByProf();
        } else if(num == 3) {
            return evaluateDAO.getThisYearSubjects();
        } else if(num == 4) {
            return evaluateDAO.getThisYearProf();
        } else {
            return null;
        }
    }

    @Override
    public List<String> findProfBySubject(String nowItem, String num)
    {
        if(num.equals("1")) {
            return evaluateDAO.findProfBySubject(nowItem);
        } else {
            return evaluateDAO.findThisYearProf(nowItem);
        }
    }

    @Override
    public List<SubjectVO> findSubByProf(String nowItem, String num) {
        if(num.equals("1")) {
            return evaluateDAO.findSubByProf(nowItem);
        } else {
            return evaluateDAO.findThisYearSub(nowItem);
        }
    }

    @Override
    public List<String> findProfBySubstr(String nowItem, String num) {
        if(num.equals("1")) {
            return evaluateDAO.findSubBySubstr(nowItem + "%");
        } else {
            return evaluateDAO.findThisYearBySubstr(nowItem + "%");
        }
    }

    @Override
    public List<EvaluateVO> getRecentEval(HashMap<String,Integer> map) {
        return evaluateDAO.getRecentEval(map);
    }

    //강의 평가 저장하기
    @Override
    public void saveEvaluateWrite(EvaluateVO evaluateVO){
        evaluateDAO.saveEvaluateWrite(evaluateVO);
    }

    //학생의 강의 평가 결과를 가져옴
    @Override
    public EvaluateVO getEvaluateComplete(HashMap<String,String> map){ return evaluateDAO.getEvaluateComplete(map);}

    //추천 했는지 여부를 확인
    @Override
    public boolean isRecommended( HashMap<String,Object> map){
        HashMap<String,Object> result=evaluateDAO.isRecommended(map);
        if(result==null) return false;
        else return true;
    }

    //추천하기
    @Override
    public void addRecommend(HashMap<String,Object> map){ evaluateDAO.addRecommend(map);}

    //추천해제하기
    @Override
    public void deleteRecommend(HashMap<String,Object> map){ evaluateDAO.deleteRecommend(map);}

    //강의평가 과목별 결과 가져오기
    @Override
    public EvaluateResultVO getEvaluateData(HashMap<String,String> map){/*HashMap<String,Object>*/
        return evaluateDAO.getEvaluateData(map);
    }

    //항목별 count 가져오기
    @Override
    public int[] getSelectCount(HashMap<String,String> map){
        int[] result={0,0,0,0,0};
        String flag=map.get("flag");
        List<CountVO> data;

        if(flag.equals("difficulty"))
            data=evaluateDAO.getDiffCount(map);
        else if(flag.equals("homework"))
            data=evaluateDAO.getHomeCount(map);
        else
            data=evaluateDAO.getCoverCount(map);

        for(int i=0;i<data.size();i++){
           result[data.get(i).getOptions()-1]=data.get(i).getCnt();
        }
        return result;
    }

    // 현재 과목, 교수의 최근 강의 평가
    @Override
    public List<EvaluateVO> getRecentSubjectEval(HashMap<String,String> map) {
        return evaluateDAO.getRecentSubjectEval(map);
    }

    //주어진 postNum의 강의 평가 결과를 가져옴
    @Override
    public EvaluateVO getEvalCompleteByPostNum(HashMap<String,Integer> map){
        return evaluateDAO.getEvalCompleteByPostNum(map);
    }

    // 선택된 과목의 강의 평가 가져오기
    @Override
    public List<EvaluateVO> findSelected(HashMap<String, Object> map) {
        if(map.get("code").equals("")){
            if (map.get("state").equals("1"))
                return evaluateDAO.findSelected3(map);
            else
                return evaluateDAO.findSelected4(map);
        }
        else {
            if (map.get("state").equals("1"))
                return evaluateDAO.findSelected(map);
            else
                return evaluateDAO.findSelected2(map);
        }
    }

    //강의 평가 전체 개수 가져오기
    @Override
    public Integer getRecentEvalCnt(){
        return evaluateDAO.getRecentEvalCnt();
    }

    // 인기 강의 가져오기
    @Override
    public List<SubjectVO> getFavoriteSub() { return evaluateDAO.getFavoriteSub(); }

    // 인기 교수 가져오기
    @Override
    public List<String> getFavoriteProf() { return evaluateDAO.getFavoriteProf(); }
}
