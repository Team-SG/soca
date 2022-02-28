package stu.stonebeans.soca.sbo.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.dao.LikedDAO;
import stu.stonebeans.soca.dao.ScheduleDAO;
import stu.stonebeans.soca.sbo.LikedSBO;
import stu.stonebeans.soca.sbo.ScheduleSBO;
import stu.stonebeans.soca.vo.*;

import javax.security.auth.Subject;
import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class LikedSBOImpl implements LikedSBO{

    @Autowired
    private LikedDAO likedDAO;

    @Override
    public List<LikedVO> findLiked(String email) {
        return likedDAO.findLiked(email);
    }

    @Override
    public void deleteLiked(HashMap<String, String> map) { likedDAO.deleteLiked(map); }

    @Override
    public void insertLiked(HashMap<String, String> map) { likedDAO.insertLiked(map); }

    @Override
    public boolean duplicateLiked(HashMap<String, String> map) {
        LikedVO likedVO = likedDAO.duplicateLiked(map);
        return likedVO == null;
    }
}
