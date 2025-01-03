PGDMP  )    )                 }            db     16.6 (Ubuntu 16.6-1.pgdg22.04+1)     16.6 (Ubuntu 16.6-1.pgdg22.04+1)     Y           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Z           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            [           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            \           1262    34723    db    DATABASE     n   CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE db;
                postgres    false            �            1259    34724    c_role    TABLE     ^  CREATE TABLE public.c_role (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_role;
       public         heap    postgres    false            �            1259    34729    c_user    TABLE     �  CREATE TABLE public.c_user (
    id character varying(36) NOT NULL,
    nama character varying(50),
    username character varying(50),
    password character varying(250),
    id_role character varying(36),
    aktif boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false,
    id_customer character varying(36)
);
    DROP TABLE public.c_user;
       public         heap    postgres    false            �            1259    34737 
   m_customer    TABLE     �  CREATE TABLE public.m_customer (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    no_telp character varying(250),
    alamat text,
    email character varying(50),
    npwp character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_customer;
       public         heap    postgres    false            �            1259    34744 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_employe;
       public         heap    postgres    false            �            1259    34749    menu    TABLE     �  CREATE TABLE public.menu (
    id character varying DEFAULT 'uuid_g'::character varying NOT NULL,
    nama_menu character varying,
    link_menu character varying,
    keterangan character varying,
    class_icon character varying,
    status character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp with time zone,
    is_permission boolean,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu;
       public         heap    postgres    false            �            1259    34757 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
    id character varying NOT NULL,
    id_menu character varying NOT NULL,
    posisi character varying(1),
    level integer,
    urutan integer,
    status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    parent character varying,
    id_role character varying,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu_user;
       public         heap    postgres    false            Q          0    34724    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    215   �       R          0    34729    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted, id_customer) FROM stdin;
    public          postgres    false    216   \        S          0    34737 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    217   "       T          0    34744 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    218   �$       U          0    34749    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    219   A%       V          0    34757 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    220   �(       �           2606    34765    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    215            �           2606    34767    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    216            �           2606    34769    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    217            �           2606    34771    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    218            �           2606    34773    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    219            �           2606    34775    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    220            �           2606    34776    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    215    216    3254            Q   �   x�M�1� �N��y��Lk��F��"�?B�ġ�7��)	���8'g�Fบ��c`Q����>=g�!a�o��&�eg=�>_�v5��P���Ș���tpF�	��_u���k�+b4�Q����r�����6*{      R   �  x����nQ���S�`{����B	)�2����9W4L \�ry�N�TB�U��_�d�MQ��H���	�a����Ҍ��ώ�]<ذ����G]�w����ޯ��|ϗ�^}yL�u�y=8�˯���q�y�/���p���Sf-8��j�J$�A �(G*!��&�@9A Tw)-@`r�h���>3���88�PӒ.�$�2$1��܂� 2l�z{mNӅ�Lfׯ�O|\�\�VQ:��v��<NS�<l�M�q�ԔP�EZ0U�kF�?�S6�U���X�^_i��1�@vu��TW{����å����u:���z'aX.U��W�������n�N��P���k&S�F�D�GG8���b!P�$7I�{���(P�L�d�Nߕ3ǜ��>�)#N�dej�$VM4����U��N�6��      S   �  x�mS�n�8}���`�)RONѢh��$���e�K�8�YBпߑ��m�� I�������Z�Z�������^���:֩����>�o~��}���ر�����#V�(����ς��Od�r�Cƞ��a͔�k���|ıck�}x��?�nM�(��姟:�ŖPTd��|��k�_�=t�ydN�D�r&��<6�ѥ� �9�炐t��������0e��E-]-��q�G�5�5 �H�!,ղ��($/�T�uܷ�UU��m4d�!����OwK,��n���ľ�i>M$�:��<��Glɪ���c�,�K���m_5�w�7�t�_	�kk��R�VE�d���CoC�<`r��	$	�	�v���"�:MDB�%��KP�Kf7}b��"��Ҁ��P���1��~�R~\ZlN�ϋ,gX�*�y���\�g����x���)+A����%�K ϱ ؐ-�eRmU]o�����FՂ�	�]1�
��!r����½Ú��7тLf�g(��c�M��v�o�����R7�_���Hnl��.׸�1_@,��|w�K�1HL�F����k �^���)i�,-�֙Sd��,��S���$ʝ���n�����g�=�I���Ϋ�a�z�/�U��n�?_�F�752ވ ����U#�����j������Z����3�      T   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      U   p  x�m�ˎ�FEל� ���TW?�{g�/N���1��8)'���E���j���UB�W�D�&�F��Q�jɽm>�i�S�[����q>�۷ڡ��9�4Q����B�VA��蛯,���,i�C���0!�:^V�����{��+��|>���6���O4��cA��Ϸ�h|�9��QBa+}�!贓>�w�_���OY�
�D�"X�B�]�F��7g:<�K�v��-��ӿ+�Ҵ`�2���C}gbZ�Q���Sh]��I;�>�ND�S����JJ�zYk/�i���t�ͮ�������@�����h*�����]��`YL��kؤ��*饤"�{V-�v
U��D��Z����<8-��%5�r+l0�Ce*edA��i<��� �j��ZEk:k�#$F���. ��2 9m�;h���ːF1+�l���_4����1���T�g1��������Mg��rC-�ȢJ�y`��a+E0�9da�t"g[�NI�Z�y߳V�z���U���뭺�ޥѮ�s:mBx�ѺhlgѰ��.*����m�P���ebI�"��Ї��k�y|���8qa��]T?L�6T�Lr��w�p�:���m��	U-$���4���5�X%օ��L��i�9��q�-o���V/# ���Rc��'!g'P��Α�s%��ͪ���Xh����RLi?�_�v�E��4ұ͉����aO?��;�uLg�^Z��x.��S�-�y�pW�B)����x
&�I)Q{�TP'�|�����w�n�yE��o&󊵹[�ݡs�74��Z6ng,o�{�l�������IZ�d���ɬu�T��M�GW�.DL�H�dT6v�S���������!��      V     x���Mn�0��~��h�I�>DO��~���I�6͢/@`�`X�f8�똵�:����;�b�c�G�5k�k� �K�&�F�q΍�zY�
��]�̦v�������8O�Ad0x���{1�����?�3Yk�����VA��&��Bl�e�$k�%*8��8���hw�-���U�Ǆ�O�opq�)����}3�K�t1_EOVg�+|Y��<�xb�)�+w�V�R�>�΍�RV��f@�����
��\�l��6ͪ}�Q���{�9��w���xI=%��]�P�������3��ЪIoc?g�MV>�хv��E2��XD�2��dA00s��C�Jc��~[�o�WZ<7�5��Eon��L)�ѥ�묪Q�O|�\�O�&ߚ�ѝ[����4�Mb��6�w=&cE��[�HK�YɁ��������	�/H�-�OĨ�k�|P\��pA�����*eN�Rg��������}��Q�)#�L+КL(j�K�4��L��>%8�%x2��������'��D{     