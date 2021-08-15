package stu.stonebeans.soca.dao;

import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.LikedVO;
import stu.stonebeans.soca.vo.ScheduleVO;
import stu.stonebeans.soca.vo.SubjectVO;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface LikedDAO {
    public List<LikedVO> findLiked(String email);

    public void deleteLiked(HashMap<String, String> map);

    public void insertLiked(HashMap<String, String> map);
}
