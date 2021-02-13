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
}
