package stu.stonebeans.soca.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.List;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    // 세션 체크
    public List includePath = Arrays.asList("/myPage", "/schedule", "/evaluateList", "/myEvaluate");

    // 세션 체크 제외 화면
    public List excludePath = Arrays.asList("/css/**", "/js/**", "/images/**", "/", "/index");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        Object email = session.getAttribute("email");

        if(email == null) {
            response.sendRedirect("/noAuth");
            return false;
        }
        return true;
    }

}
