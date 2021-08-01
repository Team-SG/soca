package stu.stonebeans.soca;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    // 메인 페이지 이동
    @RequestMapping("/")
    public String home() {
        return "index";
    }
    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @RequestMapping("/noAuth")
    public String noAuth() {
        return "noAuth";
    }

    // 마이 페이지 이동
    @RequestMapping(value = "/myPage")
    public String myPage() {
        return "myPage";
    }

    // 시간표 등록/수정 페이지 이동
    @RequestMapping(value = "/schedule")
    public String schedule() {
        return "schedule";
    }

    // 평가방 이동
    @RequestMapping(value = "/evaluate")
    public String evalute() {
        return "evaluateList";
    }
    @RequestMapping(value = "/evaluateList")
    public String evaluteList() {
        return "evaluateList";
    }

    // 나의 강의평가
    @RequestMapping(value = "/myEvaluate")
    public String myEvaluate() {
        return "myEvaluate";
    }

    // 강의평가 작성
    @RequestMapping(value = "/evaluateWrite")
    public String evaluateWrite() {
        return "evaluateWrite";
    }

    // 강의평가 (개별)결과 확인
    @RequestMapping(value = "/evaluateComplete")
    public String evaluateComplete() {
        return "evaluateComplete";
    }

    // 강의평가 (전쳬) 결과 확인
    @RequestMapping(value = "/evaluateResult")
    public String evaluateResult() {
        return "evaluateResult";
    }

    // 최근 강의 평가 목록 호출
    @RequestMapping(value="/recentEvalRes")
    public String recentEvalRes(){ return "recentEvalRes";}

    // 선택한 강의 평가 목록 호출
    @RequestMapping(value="/evaluateSelected")
    public String evaluateSelected() { return "evaluateSelected";}

    // 질문방 질문 게시글 목록 호출
    @RequestMapping(value="/questionPostList")
    public String questionPostList() { return "questionPostList";}

    // 질문방 질문 게시글 작성
    @RequestMapping(value="/questionPostFill")
    public String questionPostFill() { return "questionPostFill";}

    // 질문방 작성된 질문 게시글 조회
    @RequestMapping(value="/questionPostCheck")
    public String questionPostCheck() { return "questionPostCheck";}
}
