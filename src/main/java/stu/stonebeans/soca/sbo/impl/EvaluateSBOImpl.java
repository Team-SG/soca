package stu.stonebeans.soca.sbo.impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.config.PropertyUtil;
import stu.stonebeans.soca.sbo.EvaluateSBO;
import stu.stonebeans.soca.sbo.MailSBO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.MailVO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.SubjectVO;
import stu.stonebeans.soca.dao.StudentDAO;
import stu.stonebeans.soca.dao.EvaluateDAO;

import javax.servlet.http.HttpSession;
import java.util.List;

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
    public List<SubjectVO> findSubjects() { return evaluateDAO.getAllSubjects(); }
}
