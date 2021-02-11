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

    // 마이 페이지 이동
    @RequestMapping(value = "/myPage")
    public String myPage() {
        return "myPage";
    }
}