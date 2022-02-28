package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.LikedSBO;
import stu.stonebeans.soca.sbo.ScheduleSBO;
import stu.stonebeans.soca.vo.LikedVO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.ScheduleVO;
import stu.stonebeans.soca.vo.SubjectVO;

import javax.servlet.http.HttpSession;
import javax.xml.transform.Result;
import java.util.HashMap;
import java.util.List;

@RestController
public class LikedController {

    private LikedSBO likedSBO;

    @Autowired
    public LikedController(LikedSBO likedSBO) {
        this.likedSBO = likedSBO;
    }

    @RequestMapping(value="/findLiked", method=RequestMethod.POST)
    public List<LikedVO> findLiked(HttpSession session) {
        return likedSBO.findLiked((String)session.getAttribute("email"));
    }

    @RequestMapping(value="/deleteLiked", method=RequestMethod.POST)
    public void deleteLiked(HttpSession session, @RequestBody String data){
        HashMap<String,String> hmap = new HashMap<>();
        hmap.put("email",(String)session.getAttribute("email"));
        hmap.put("subjectNO", data.substring(1, data.length() - 1));
        likedSBO.deleteLiked(hmap);
    }

    @RequestMapping(value="/insertLiked", method=RequestMethod.POST)
    public void insertLiked(HttpSession session, @RequestBody HashMap<String, String> map) {
        map.put("email",(String)session.getAttribute("email"));
        likedSBO.insertLiked(map);
    }

    @RequestMapping(value="/duplicateLiked", method=RequestMethod.POST)
    public boolean duplicateLiked(HttpSession session, @RequestBody String data) {
        HashMap<String,String> map = new HashMap<>();
        map.put("email",(String)session.getAttribute("email"));
        map.put("subjectNO", data.substring(1, data.length() - 1));
        return likedSBO.duplicateLiked(map);
    }
}
